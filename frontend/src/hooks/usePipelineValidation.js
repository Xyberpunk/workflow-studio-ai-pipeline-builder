import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useWorkflowStore } from "../store/useWorkflowStore";
import { serializePipeline } from "../utils/pipelineSerializer";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL ?? "";
const PIPELINE_PARSE_PATH = "/api/pipelines/parse";

export const usePipelineValidation = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nodes = useWorkflowStore((state) => state.nodes);
  const edges = useWorkflowStore((state) => state.edges);
  const setValidation = useWorkflowStore((state) => state.setValidation);

  const validatePipeline = useCallback(async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}${PIPELINE_PARSE_PATH}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serializePipeline(nodes, edges)),
      });

      if (!response.ok) {
        throw new Error(`Validation failed with status ${response.status}`);
      }

      const result = await response.json();
      setValidation(result);

      const hasErrors = result.validation_errors?.length || !result.is_dag;
      const warnings = [...(result.warnings ?? []), ...(result.isolated_nodes ?? []).map((node) => `Isolated node: ${node}`)];

      if (hasErrors) {
        toast.error(
          <div className="space-y-1">
            <p className="font-semibold">Pipeline validation failed.</p>
            <p>Nodes: {result.num_nodes} | Edges: {result.num_edges}</p>
            {(result.validation_errors ?? []).slice(0, 3).map((message) => (
              <p key={message} className="text-slate-300">
                {message}
              </p>
            ))}
          </div>,
        );
      } else {
        toast.success(
          <div className="space-y-1">
            <p className="font-semibold">Pipeline validated successfully.</p>
            <p>Nodes: {result.num_nodes} | Edges: {result.num_edges}</p>
            <p>DAG: Valid</p>
            {warnings.slice(0, 2).map((message) => (
              <p key={message} className="text-amber-200">
                {message}
              </p>
            ))}
          </div>,
        );
      }

      return result;
    } catch (error) {
      toast.error(
        <div className="space-y-1">
          <p className="font-semibold">Pipeline validation failed.</p>
          <p className="text-slate-300">{error.message}</p>
        </div>,
      );
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, [edges, nodes, setValidation]);

  return { isSubmitting, validatePipeline };
};
