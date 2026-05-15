import { memo, useCallback } from "react";
import { useWorkflowStore } from "../store/useWorkflowStore";
import { NodeCard } from "./NodeCard";
import { NodeField } from "./NodeField";
import { NodeHandle } from "./NodeHandle";
import { NodeHeader } from "./NodeHeader";
import { NodeToolbar } from "./NodeToolbar";

export const BaseNode = memo(
  ({
    id,
    data,
    title,
    subtitle,
    icon: Icon,
    color = "slate",
    status,
    inputs = [],
    outputs = [],
    fields = [],
    children,
    dimensions,
    toolbar = true,
  }) => {
    const updateNodeField = useWorkflowStore((state) => state.updateNodeField);

    // Nodes stay configuration-driven: individual node files describe inputs,
    // outputs, and fields while this component owns the shared rendering contract.
    const handleFieldChange = useCallback(
      (key, value) => {
        updateNodeField(id, key, value);
      },
      [id, updateNodeField],
    );

    return (
      <NodeCard color={color} dimensions={dimensions}>
        <div className="relative">
          <NodeToolbar enabled={toolbar} id={id} />
          {inputs.map((handle, index) => (
            <NodeHandle
              key={handle.id}
              id={handle.id}
              index={index}
              label={handle.label}
              side="left"
              total={inputs.length}
              type="target"
            />
          ))}

          {outputs.map((handle, index) => (
            <NodeHandle
              key={handle.id}
              id={handle.id}
              index={index}
              label={handle.label}
              side="right"
              total={outputs.length}
              type="source"
            />
          ))}

          <NodeHeader color={color} icon={Icon} status={status} subtitle={subtitle} title={title} />

          {fields.length > 0 ? (
            <div className="space-y-3">
              {fields.map((field) => (
                <NodeField
                  key={field.key}
                  field={field}
                  textareaRef={field.textareaRef}
                  value={data?.[field.key] ?? field.defaultValue ?? ""}
                  onChange={handleFieldChange}
                />
              ))}
            </div>
          ) : null}

          {children ? <div className={fields.length > 0 ? "mt-4" : ""}>{children}</div> : null}
        </div>
      </NodeCard>
    );
  },
);
