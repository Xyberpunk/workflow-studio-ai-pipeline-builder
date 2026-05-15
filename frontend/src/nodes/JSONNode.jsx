import { Braces } from "lucide-react";
import { BaseNode } from "../components/BaseNode";
import { validateJsonValue } from "../utils/validationUtils";

export const JSONNode = ({ id, data }) => {
  const validation = validateJsonValue(data?.json ?? "");

  return (
    <BaseNode
      id={id}
      data={data}
      title="JSON"
      subtitle={validation.valid ? "Valid structured payload" : validation.message}
      icon={Braces}
      color="teal"
      status={validation.valid ? "valid" : "invalid"}
      inputs={[{ id: `${id}-input`, label: "payload" }]}
      outputs={[{ id: `${id}-json`, label: "json" }]}
      fields={[
        {
          type: "textarea",
          label: "JSON",
          key: "json",
          rows: 5,
          mono: true,
          placeholder: '{ "status": "ready" }',
          helper: validation.valid ? "Payload is parseable JSON." : validation.message,
        },
      ]}
    />
  );
};
