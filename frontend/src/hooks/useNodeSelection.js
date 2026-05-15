import { useWorkflowStore } from "../store/useWorkflowStore";

export const useNodeSelection = () => {
  const selectedNodeId = useWorkflowStore((state) => state.selectedNodeId);
  const setSelectedNodeId = useWorkflowStore((state) => state.setSelectedNodeId);

  return { selectedNodeId, setSelectedNodeId };
};
