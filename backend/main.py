from collections import defaultdict, deque
from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PipelineNode(BaseModel):
    id: str
    type: str | None = None
    position: dict[str, float] | None = None
    data: dict[str, Any] = Field(default_factory=dict)


class PipelineEdge(BaseModel):
    id: str | None = None
    source: str
    target: str
    sourceHandle: str | None = None
    targetHandle: str | None = None


class PipelineRequest(BaseModel):
    nodes: list[PipelineNode] = Field(default_factory=list)
    edges: list[PipelineEdge] = Field(default_factory=list)


class PipelineParseResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool
    isolated_nodes: list[str] = Field(default_factory=list)
    validation_errors: list[str] = Field(default_factory=list)
    warnings: list[str] = Field(default_factory=list)


def analyze_pipeline_graph(nodes: list[PipelineNode], edges: list[PipelineEdge]) -> PipelineParseResponse:
    node_ids = {node.id for node in nodes}
    adjacency: dict[str, list[str]] = defaultdict(list)
    undirected_adjacency: dict[str, set[str]] = defaultdict(set)
    indegrees = {node_id: 0 for node_id in node_ids}
    connected_node_ids: set[str] = set()
    validation_errors: list[str] = []
    warnings: list[str] = []
    seen_edges: set[tuple[str, str, str | None, str | None]] = set()

    # Kahn's algorithm gives deterministic validation and also catches malformed
    # edges that reference nodes outside the submitted graph.
    for edge in edges:
        if edge.source not in node_ids or edge.target not in node_ids:
            validation_errors.append(f"Invalid edge references missing node: {edge.source} -> {edge.target}")
            continue

        edge_key = (edge.source, edge.target, edge.sourceHandle, edge.targetHandle)
        if edge_key in seen_edges:
            validation_errors.append(f"Duplicate edge detected: {edge.source} -> {edge.target}")
            continue

        seen_edges.add(edge_key)
        connected_node_ids.update([edge.source, edge.target])

        adjacency[edge.source].append(edge.target)
        undirected_adjacency[edge.source].add(edge.target)
        undirected_adjacency[edge.target].add(edge.source)
        indegrees[edge.target] += 1

    queue = deque(node_id for node_id, indegree in indegrees.items() if indegree == 0)
    visited_count = 0

    while queue:
        node_id = queue.popleft()
        visited_count += 1

        for neighbor in adjacency[node_id]:
            indegrees[neighbor] -= 1
            if indegrees[neighbor] == 0:
                queue.append(neighbor)

    is_dag = visited_count == len(node_ids)
    if not is_dag:
        validation_errors.append("Cycle detected: graph is not a directed acyclic graph.")

    isolated_nodes = sorted(node_id for node_id in node_ids if node_id not in connected_node_ids)
    if isolated_nodes:
        warnings.append(f"{len(isolated_nodes)} isolated node(s) are not connected to the workflow.")

    if nodes and not isolated_nodes:
        remaining = set(node_ids)
        component_count = 0
        while remaining:
            component_count += 1
            start = remaining.pop()
            component_queue = deque([start])
            while component_queue:
                current = component_queue.popleft()
                for neighbor in undirected_adjacency[current]:
                    if neighbor in remaining:
                        remaining.remove(neighbor)
                        component_queue.append(neighbor)

        if component_count > 1:
            warnings.append(f"Workflow has {component_count} disconnected graph components.")

    return PipelineParseResponse(
        num_nodes=len(nodes),
        num_edges=len(edges),
        is_dag=is_dag and not validation_errors,
        isolated_nodes=isolated_nodes,
        validation_errors=validation_errors,
        warnings=warnings,
    )


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse', response_model=PipelineParseResponse)
def parse_pipeline(pipeline: PipelineRequest) -> PipelineParseResponse:
    return analyze_pipeline_graph(pipeline.nodes, pipeline.edges)


@app.post('/api/pipelines/parse', response_model=PipelineParseResponse)
def parse_pipeline_api(pipeline: PipelineRequest) -> PipelineParseResponse:
    return parse_pipeline(pipeline)
