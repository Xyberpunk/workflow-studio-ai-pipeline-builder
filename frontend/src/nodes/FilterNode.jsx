import { Filter } from "lucide-react";
import { BaseNode } from "../components/BaseNode";

export const FilterNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Filter"
    subtitle="Conditional branch"
    icon={Filter}
    variant="filter"
    inputs={[{ id: `${id}-input`, label: "input" }]}
    outputs={[
      { id: `${id}-true`, label: "true" },
      { id: `${id}-false`, label: "false" },
    ]}
    fields={[{ type: "text", label: "Condition", key: "condition", placeholder: "score > 0.8" }]}
  />
);
