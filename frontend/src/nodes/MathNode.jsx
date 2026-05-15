import { Calculator } from "lucide-react";
import { BaseNode } from "../components/BaseNode";

const compute = (operation, a, b) => {
  const left = Number(a) || 0;
  const right = Number(b) || 0;
  if (operation === "Subtract") return left - right;
  if (operation === "Multiply") return left * right;
  if (operation === "Divide") return right === 0 ? "undefined" : left / right;
  if (operation === "Average") return (left + right) / 2;
  return left + right;
};

export const MathNode = ({ id, data }) => {
  const result = compute(data?.operation, data?.valueA, data?.valueB);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Math"
      subtitle="Numeric transform"
      icon={Calculator}
      color="fuchsia"
      status="compute"
      inputs={[
        { id: `${id}-a`, label: "a" },
        { id: `${id}-b`, label: "b" },
      ]}
      outputs={[{ id: `${id}-result`, label: "result" }]}
      fields={[
        { type: "select", label: "Operation", key: "operation", options: ["Add", "Subtract", "Multiply", "Divide", "Average"] },
        { type: "number", label: "Fallback A", key: "valueA", step: 1 },
        { type: "number", label: "Fallback B", key: "valueB", step: 1 },
        { type: "readonly", label: "Preview Result", key: "resultPreview", defaultValue: result },
      ]}
    />
  );
};
