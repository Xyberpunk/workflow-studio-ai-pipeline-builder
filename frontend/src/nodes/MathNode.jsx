import { Calculator } from "lucide-react";
import { BaseNode } from "../components/BaseNode";

export const MathNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Math"
    subtitle="Numeric transform"
    icon={Calculator}
    variant="math"
    inputs={[
      { id: `${id}-a`, label: "a" },
      { id: `${id}-b`, label: "b" },
    ]}
    outputs={[{ id: `${id}-result`, label: "result" }]}
    fields={[
      { type: "select", label: "Operation", key: "operation", options: ["Add", "Subtract", "Multiply", "Divide", "Average"] },
      { type: "number", label: "Fallback A", key: "valueA", step: 1 },
      { type: "number", label: "Fallback B", key: "valueB", step: 1 },
    ]}
  />
);
