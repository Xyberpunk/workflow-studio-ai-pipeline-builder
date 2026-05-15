import { GitMerge } from "lucide-react";
import { BaseNode } from "../components/BaseNode";

export const MergeNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Merge"
    subtitle="Combine branches"
    icon={GitMerge}
    color="purple"
    status="join"
    inputs={[
      { id: `${id}-input-a`, label: "input A" },
      { id: `${id}-input-b`, label: "input B" },
      { id: `${id}-input-c`, label: "input C" },
    ]}
    outputs={[{ id: `${id}-merged`, label: "merged" }]}
    fields={[{ type: "select", label: "Strategy", key: "strategy", options: ["Append", "Deep merge", "First valid", "Latest"] }]}
  />
);
