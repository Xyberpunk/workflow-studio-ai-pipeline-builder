import { getNodeDefinition, nodePalette } from "../registry/nodeRegistry";

export const NODE_PALETTE = nodePalette;

export const createPipelineNode = ({ id, type, position }) => {
  const definition = getNodeDefinition(type);
  const defaults = definition?.defaults?.(id) ?? {};

  return {
    id,
    type,
    position,
    data: {
      id,
      nodeType: type,
      ...defaults,
    },
  };
};
