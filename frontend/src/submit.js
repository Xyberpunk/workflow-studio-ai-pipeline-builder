// submit.js

import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useStore } from "./store";
import { serializePipeline } from "./utils/graphUtils";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL ?? "";
const PIPELINE_PARSE_PATH = "/api/pipelines/parse";

export const usePipelineSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const submitPipeline = useCallback(async () => {
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
      const isDag = Boolean(result.is_dag);

      toast.success(
        <div className="space-y-1">
          <p className="font-semibold">Pipeline validated successfully.</p>
          <p>Nodes: {result.num_nodes}</p>
          <p>Edges: {result.num_edges}</p>
          <p>DAG: {isDag ? "Valid" : "Invalid"}</p>
        </div>,
        { icon: isDag ? "✓" : "!" },
      );
    } catch (error) {
      toast.error(
        <div className="space-y-1">
          <p className="font-semibold">Pipeline validation failed.</p>
          <p className="text-slate-300">{error.message}</p>
        </div>,
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [edges, nodes]);

  return { isSubmitting, submitPipeline };
};
