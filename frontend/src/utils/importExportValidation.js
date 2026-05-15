export const validateImportedPipeline = (pipeline) => {
  if (!pipeline || typeof pipeline !== "object") {
    return { valid: false, message: "Import must be a JSON object." };
  }

  if (!Array.isArray(pipeline.nodes) || !Array.isArray(pipeline.edges)) {
    return { valid: false, message: "Workflow JSON must include nodes and edges arrays." };
  }

  const nodeIds = new Set();
  for (const node of pipeline.nodes) {
    if (!node?.id || !node?.type || !node?.position) {
      return { valid: false, message: "Every imported node needs id, type, and position." };
    }
    if (nodeIds.has(node.id)) {
      return { valid: false, message: `Duplicate node id found: ${node.id}` };
    }
    nodeIds.add(node.id);
  }

  for (const edge of pipeline.edges) {
    if (!edge?.source || !edge?.target) {
      return { valid: false, message: "Every imported edge needs source and target." };
    }
    if (!nodeIds.has(edge.source) || !nodeIds.has(edge.target)) {
      return { valid: false, message: `Edge references missing node: ${edge.source} -> ${edge.target}` };
    }
  }

  return { valid: true, message: "Workflow JSON is valid." };
};
