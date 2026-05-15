export const NodeField = ({ field, value, onChange, textareaRef }) => {
  const id = `${field.key}-${field.label}`;

  if (field.type === "readonly") {
    return (
      <div>
        <span className="node-label">{field.label}</span>
        <div className="rounded-lg border border-slate-700/80 bg-slate-950/40 px-3 py-2 text-sm text-slate-300">
          {field.render ? field.render(value) : value}
        </div>
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <label htmlFor={id} className="block">
        <span className="node-label">{field.label}</span>
        <select id={id} className="node-field" value={value} onChange={(event) => onChange(field.key, event.target.value)}>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === "textarea") {
    return (
      <label htmlFor={id} className="block">
        <span className="node-label">{field.label}</span>
        <textarea
          id={id}
          ref={textareaRef}
          rows={field.rows ?? 3}
          className={`node-field min-h-24 resize-none leading-6 ${field.mono ? "font-mono text-xs" : ""}`}
          placeholder={field.placeholder}
          value={value}
          onChange={(event) => onChange(field.key, event.target.value)}
        />
        {field.helper ? <span className="mt-1 block text-[11px] text-slate-500">{field.helper}</span> : null}
      </label>
    );
  }

  return (
    <label htmlFor={id} className="block">
      <span className="node-label">{field.label}</span>
      <input
        id={id}
        className="node-field"
        min={field.min}
        placeholder={field.placeholder}
        step={field.step}
        type={field.type ?? "text"}
        value={value}
        onChange={(event) => onChange(field.key, field.type === "number" ? Number(event.target.value) : event.target.value)}
      />
      {field.helper ? <span className="mt-1 block text-[11px] text-slate-500">{field.helper}</span> : null}
    </label>
  );
};
