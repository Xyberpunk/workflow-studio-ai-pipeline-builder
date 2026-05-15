import { LogIn } from "lucide-react";
import { BaseNode } from "../components/BaseNode";

export const InputNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Input"
    subtitle="External value"
    icon={LogIn}
    color="cyan"
    status="source"
    outputs={[{ id: `${id}-value`, label: "value" }]}
    fields={[
      { type: "text", label: "Name", key: "inputName" },
      { type: "select", label: "Type", key: "inputType", options: ["Text", "File", "Number", "JSON"] },
    ]}
  />
);
