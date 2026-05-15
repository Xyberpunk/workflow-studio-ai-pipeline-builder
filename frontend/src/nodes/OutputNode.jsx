import { LogOut } from "lucide-react";
import { BaseNode } from "../components/BaseNode";

export const OutputNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Output"
    subtitle="Pipeline result"
    icon={LogOut}
    color="emerald"
    status="sink"
    inputs={[{ id: `${id}-value`, label: "value" }]}
    fields={[
      { type: "text", label: "Name", key: "outputName" },
      { type: "select", label: "Type", key: "outputType", options: ["Text", "Image", "File", "JSON"] },
    ]}
  />
);
