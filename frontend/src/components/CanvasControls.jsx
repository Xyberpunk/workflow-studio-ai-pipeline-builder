import { Maximize2, Minus, Plus } from "lucide-react";
import { useReactFlow } from "reactflow";
import { useWorkflowStore } from "../store/useWorkflowStore";
import { getGraphStats } from "../utils/graphUtils";
import { getValidationTone } from "../utils/validationUtils";

const toneClasses = {
  idle: "border-slate-700 bg-slate-900/85 text-slate-300",
  success: "border-emerald-400/40 bg-emerald-500/10 text-emerald-200",
  warning: "border-amber-300/40 bg-amber-400/10 text-amber-100",
  danger: "border-red-400/40 bg-red-500/10 text-red-200",
};

export const CanvasControls = () => {
  const { fitView, zoomIn, zoomOut } = useReactFlow();
  const nodes = useWorkflowStore((state) => state.nodes);
  const edges = useWorkflowStore((state) => state.edges);
  const validation = useWorkflowStore((state) => state.validation);
  const stats = getGraphStats(nodes, edges);
  const tone = getValidationTone(validation);

  return (
    <div className="pointer-events-none absolute inset-x-4 bottom-4 z-10 flex items-end justify-between">
      <div className="pointer-events-auto rounded-2xl border border-slate-800 bg-slate-950/80 p-2 shadow-xl backdrop-blur-xl">
        <div className="grid grid-cols-3 gap-1">
          <button className="icon-button" title="Zoom in" type="button" onClick={() => zoomIn()}>
            <Plus size={16} />
          </button>
          <button className="icon-button" title="Zoom out" type="button" onClick={() => zoomOut()}>
            <Minus size={16} />
          </button>
          <button className="icon-button" title="Fit view" type="button" onClick={() => fitView({ padding: 0.25 })}>
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      <div className={`pointer-events-auto max-w-md rounded-2xl border px-4 py-3 shadow-xl backdrop-blur-xl ${toneClasses[tone]}`}>
        <div className="flex items-center gap-4 text-xs font-medium">
          <span>{stats.nodeCount} nodes</span>
          <span>{stats.edgeCount} edges</span>
          <span>{stats.isolatedCount} isolated</span>
          <span>{validation ? (validation.is_dag ? "DAG valid" : "Cycle detected") : "Not validated"}</span>
        </div>
      </div>
    </div>
  );
};
