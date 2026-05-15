import { MessageSquareText } from "lucide-react";
import { BaseNode } from "../components/BaseNode";
import { useNodeDimensions } from "../hooks/useNodeDimensions";
import { useVariableParser } from "../hooks/useVariableParser";

export const PromptTemplateNode = ({ id, data }) => {
  const template = data?.template ?? "";
  const variables = useVariableParser(template);
  const { textareaRef, dimensions } = useNodeDimensions(template, { minWidth: 360, maxWidth: 560, minHeight: 220 });

  return (
    <BaseNode
      id={id}
      data={data}
      title="Prompt Template"
      subtitle={`${variables.length} interpolation variable${variables.length === 1 ? "" : "s"}`}
      icon={MessageSquareText}
      color="violet"
      status="prompt"
      dimensions={dimensions}
      inputs={variables.map((variable) => ({ id: `${id}-var-${variable}`, label: variable }))}
      outputs={[{ id: `${id}-prompt`, label: "prompt" }]}
      fields={[
        { type: "select", label: "Format", key: "format", options: ["Markdown", "JSON", "Plain Text"] },
        {
          type: "textarea",
          label: "Template",
          key: "template",
          placeholder: "Write for {{audience}} in a {{tone}} voice",
          textareaRef,
        },
      ]}
    />
  );
};
