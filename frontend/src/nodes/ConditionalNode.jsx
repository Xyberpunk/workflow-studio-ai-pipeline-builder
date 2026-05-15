import { GitBranch } from "lucide-react";
import { BaseNode } from "../components/BaseNode";
import { useVariableParser } from "../hooks/useVariableParser";

export const ConditionalNode = ({ id, data }) => {
  const expression = data?.expression ?? "";
  const variables = useVariableParser(expression);

  return (
    <BaseNode
      id={id}
      data={data}
      title="If / Else"
      subtitle={variables.length ? `Depends on ${variables.join(", ")}` : "Route by expression"}
      icon={GitBranch}
      color="orange"
      status="logic"
      inputs={[{ id: `${id}-input`, label: "input" }]}
      outputs={[
        { id: `${id}-if`, label: "if" },
        { id: `${id}-else`, label: "else" },
      ]}
      fields={[{ type: "text", label: "Expression", key: "expression", placeholder: "{{status}} === 'approved'" }]}
    />
  );
};
