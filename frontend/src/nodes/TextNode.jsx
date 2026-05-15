import { TextCursorInput } from "lucide-react";
import { BaseNode } from "../components/BaseNode";
import { useDynamicSize } from "../hooks/useDynamicSize";
import { useVariableParser } from "../hooks/useVariableParser";

export const TextNode = ({ id, data }) => {
  const text = data?.text ?? "";
  const variables = useVariableParser(text);
  const { textareaRef, dimensions } = useDynamicSize(text);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      subtitle={variables.length ? `${variables.length} dynamic input${variables.length === 1 ? "" : "s"}` : "Template prompt"}
      icon={TextCursorInput}
      variant="text"
      dimensions={dimensions}
      inputs={variables.map((variable) => ({
        id: `${id}-var-${variable}`,
        label: variable,
      }))}
      outputs={[{ id: `${id}-output`, label: "text" }]}
      fields={[
        {
          type: "textarea",
          label: "Prompt",
          key: "text",
          placeholder: "Use {{variable}} to create dynamic inputs",
          textareaRef,
        },
      ]}
    />
  );
};
