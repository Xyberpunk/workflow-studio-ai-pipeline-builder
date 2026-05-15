import { Sparkles } from "lucide-react";
import { BaseNode } from "../components/BaseNode";

export const LLMNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="LLM"
    subtitle="Prompt and system context"
    icon={Sparkles}
    variant="llm"
    inputs={[
      { id: `${id}-system`, label: "system" },
      { id: `${id}-prompt`, label: "prompt" },
    ]}
    outputs={[{ id: `${id}-response`, label: "response" }]}
    fields={[
      { type: "select", label: "Model", key: "model", options: ["gpt-4o-mini", "gpt-4o", "claude-3.5", "gemini-1.5"] },
      { type: "number", label: "Temperature", key: "temperature", min: 0, step: 0.1 },
    ]}
  />
);
