import { Download, FileUp, RotateCcw, RotateCw, Trash2 } from "lucide-react";
import { useRef } from "react";
import toast from "react-hot-toast";
import { usePipelineValidation } from "../hooks/usePipelineValidation";
import { useWorkflowStore } from "../store/useWorkflowStore";
import { downloadPipeline, serializePipeline } from "../utils/pipelineSerializer";
import { SubmitButton } from "./SubmitButton";

export const Topbar = () => {
  const inputRef = useRef(null);
  const nodes = useWorkflowStore((state) => state.nodes);
  const edges = useWorkflowStore((state) => state.edges);
  const undo = useWorkflowStore((state) => state.undo);
  const redo = useWorkflowStore((state) => state.redo);
  const clearWorkflow = useWorkflowStore((state) => state.clearWorkflow);
  const importWorkflow = useWorkflowStore((state) => state.importWorkflow);
  const historyLength = useWorkflowStore((state) => state.history.length);
  const futureLength = useWorkflowStore((state) => state.future.length);
  const { isSubmitting, validatePipeline } = usePipelineValidation();

  const handleImport = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const payload = JSON.parse(await file.text());
      importWorkflow(payload);
      toast.success("Workflow imported.");
    } catch (error) {
      toast.error(`Import failed: ${error.message}`);
    } finally {
      event.target.value = "";
    }
  };

  return (
    <header className="flex min-h-20 items-center justify-between border-b border-slate-800 bg-slate-950/80 px-5 backdrop-blur-xl">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold tracking-tight text-slate-50">Workflow Studio</h1>
          <span className="rounded-full border border-indigo-400/30 bg-indigo-400/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-indigo-200">
            Orchestration
          </span>
        </div>
        <p className="text-sm text-slate-400">Build, connect, validate, and ship AI workflow graphs.</p>
      </div>

      <div className="flex items-center gap-2">
        <button className="icon-button" disabled={!historyLength} title="Undo" type="button" onClick={undo}>
          <RotateCcw size={16} />
        </button>
        <button className="icon-button" disabled={!futureLength} title="Redo" type="button" onClick={redo}>
          <RotateCw size={16} />
        </button>
        <button
          className="command-button"
          type="button"
          onClick={() => downloadPipeline(serializePipeline(nodes, edges))}
        >
          <Download size={16} />
          Export
        </button>
        <button className="command-button" type="button" onClick={() => inputRef.current?.click()}>
          <FileUp size={16} />
          Import
        </button>
        <button className="icon-button text-red-200 hover:border-red-400/60 hover:bg-red-500/15" title="Clear workflow" type="button" onClick={clearWorkflow}>
          <Trash2 size={16} />
        </button>
        <SubmitButton isSubmitting={isSubmitting} onSubmit={validatePipeline} />
        <input ref={inputRef} accept="application/json" className="hidden" type="file" onChange={handleImport} />
      </div>
    </header>
  );
};
