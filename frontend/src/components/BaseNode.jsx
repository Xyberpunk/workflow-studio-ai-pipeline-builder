import { memo, useCallback } from "react";
import { useStore } from "../store";
import { useNodeStyles } from "../hooks/useNodeStyles";
import { NodeCard } from "./NodeCard";
import { NodeField } from "./NodeField";
import { NodeHandle } from "./NodeHandle";

export const BaseNode = memo(
  ({
    id,
    data,
    title,
    subtitle,
    icon: Icon,
    variant = "default",
    inputs = [],
    outputs = [],
    fields = [],
    children,
    dimensions,
  }) => {
    const updateNodeField = useStore((state) => state.updateNodeField);
    const styles = useNodeStyles(variant);

    // Nodes stay configuration-driven: individual node files describe inputs,
    // outputs, and fields while this component owns the shared rendering contract.
    const handleFieldChange = useCallback(
      (key, value) => {
        updateNodeField(id, key, value);
      },
      [id, updateNodeField],
    );

    return (
      <NodeCard dimensions={dimensions}>
        <div className="relative">
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

          <div className="mb-4 flex items-center gap-3">
            {Icon ? (
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${styles.icon}`}>
                <Icon size={18} strokeWidth={2.3} />
              </div>
            ) : null}
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-slate-50">{title}</div>
              {subtitle ? <div className="truncate text-xs text-slate-400">{subtitle}</div> : null}
            </div>
          </div>

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
