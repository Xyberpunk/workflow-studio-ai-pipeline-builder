export { serializePipeline } from "./pipelineSerializer";

export const getGraphStats = (nodes, edges) => {
  const connectedNodeIds = new Set();
  edges.forEach((edge) => {
    connectedNodeIds.add(edge.source);
    connectedNodeIds.add(edge.target);
  });

  return {
    nodeCount: nodes.length,
    edgeCount: edges.length,
    isolatedCount: nodes.filter((node) => !connectedNodeIds.has(node.id)).length,
  };
};
