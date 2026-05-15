export const NodeField = ({ field, value, onChange, textareaRef }) => {
  const id = `${field.key}-${field.label}`;

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
          className="node-field min-h-24 resize-none leading-6"
          placeholder={field.placeholder}
          value={value}
          onChange={(event) => onChange(field.key, event.target.value)}
        />
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
    </label>
  );
};
