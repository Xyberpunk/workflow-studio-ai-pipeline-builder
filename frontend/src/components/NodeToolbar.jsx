import { Copy, Trash2 } from "lucide-react";
import { useWorkflowStore } from "../store/useWorkflowStore";

export const NodeToolbar = ({ id, enabled = true }) => {
  const setSelectedNodeId = useWorkflowStore((state) => state.setSelectedNodeId);
  const deleteSelected = useWorkflowStore((state) => state.deleteSelected);

  if (!enabled) {
    return null;
  }

  return (
    <div className="absolute -right-3 -top-3 z-20 hidden items-center gap-1 rounded-lg border border-slate-700 bg-slate-950/95 p-1 shadow-xl group-hover:flex">
      <button
        className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-slate-100"
        title="Select node"
        type="button"
        onClick={() => setSelectedNodeId(id)}
      >
        <Copy size={13} />
      </button>
      <button
        className="rounded-md p-1.5 text-slate-400 transition hover:bg-red-500/15 hover:text-red-200"
        title="Delete selected node"
        type="button"
        onClick={() => {
          setSelectedNodeId(id);
          setTimeout(deleteSelected, 0);
        }}
      >
        <Trash2 size={13} />
      </button>
    </div>
  );
};
