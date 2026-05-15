import { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, { Background, MiniMap, ReactFlowProvider } from "reactflow";
import { CanvasControls } from "../components/CanvasControls";
import { Layout } from "../components/Layout";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import { nodeRegistry } from "../registry/nodeRegistry";
import { useWorkflowStore } from "../store/useWorkflowStore";
import { createPipelineNode } from "../utils/nodeFactory";
import "reactflow/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };

const WorkflowCanvas = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const nodes = useWorkflowStore((state) => state.nodes);
  const edges = useWorkflowStore((state) => state.edges);
  const getNodeID = useWorkflowStore((state) => state.getNodeID);
  const addNode = useWorkflowStore((state) => state.addNode);
  const onNodesChange = useWorkflowStore((state) => state.onNodesChange);
  const onEdgesChange = useWorkflowStore((state) => state.onEdgesChange);
  const onConnect = useWorkflowStore((state) => state.onConnect);
  const setSelectedNodeId = useWorkflowStore((state) => state.setSelectedNodeId);
  const deleteSelected = useWorkflowStore((state) => state.deleteSelected);
  const undo = useWorkflowStore((state) => state.undo);
  const redo = useWorkflowStore((state) => state.redo);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!reactFlowWrapper.current || !reactFlowInstance) {
        return;
      }

      const appData = event.dataTransfer.getData("application/reactflow");
      if (!appData) {
        return;
      }

      const type = JSON.parse(appData)?.nodeType;
      if (!type) {
        return;
      }

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });
      const id = getNodeID(type);
      addNode(createPipelineNode({ id, type, position }));
    },
    [addNode, getNodeID, reactFlowInstance],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "z") {
        event.preventDefault();
        if (event.shiftKey) redo();
        else undo();
      }

      if ((event.key === "Backspace" || event.key === "Delete") && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)) {
        deleteSelected();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [deleteSelected, redo, undo]);

  return (
    <div ref={reactFlowWrapper} className="h-full w-full">
      <ReactFlow
        connectionLineType="smoothstep"
        edges={edges}
        fitView
        nodeTypes={nodeRegistry}
        nodes={nodes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        snapToGrid
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onEdgesChange={onEdgesChange}
        onInit={setReactFlowInstance}
        onNodeClick={(_, node) => setSelectedNodeId(node.id)}
        onNodesChange={onNodesChange}
        onPaneClick={() => setSelectedNodeId(null)}
      >
        <Background color="#334155" gap={gridSize} size={1.2} />
        <MiniMap
          bgColor="#0f172a"
          maskColor="rgba(15, 23, 42, 0.58)"
          nodeBorderRadius={8}
          nodeColor="#6366f1"
          nodeStrokeColor="#a5b4fc"
          pannable
          zoomable
        />
        <CanvasControls />
      </ReactFlow>
    </div>
  );
};

export const WorkflowStudio = () => (
  <ReactFlowProvider>
    <Layout sidebar={<Sidebar />} topbar={<Topbar />} canvas={<WorkflowCanvas />} />
  </ReactFlowProvider>
);
