export const NODE_DEFINITIONS = {
  customInput: {
    type: "customInput",
    label: "Input",
    description: "External value",
    icon: "LogIn",
    defaults: (id) => ({
      inputName: id.replace("customInput-", "input_"),
      inputType: "Text",
    }),
  },
  llm: {
    type: "llm",
    label: "LLM",
    description: "Generate response",
    icon: "Sparkles",
    defaults: () => ({
      model: "gpt-4o-mini",
      temperature: 0.3,
    }),
  },
  customOutput: {
    type: "customOutput",
    label: "Output",
    description: "Pipeline result",
    icon: "LogOut",
    defaults: (id) => ({
      outputName: id.replace("customOutput-", "output_"),
      outputType: "Text",
    }),
  },
  text: {
    type: "text",
    label: "Text",
    description: "Template prompt",
    icon: "TextCursorInput",
    defaults: () => ({
      text: "Summarize {{document}} using {{style}}",
    }),
  },
  api: {
    type: "api",
    label: "API",
    description: "HTTP request",
    icon: "Globe",
    defaults: () => ({
      url: "https://api.example.com/data",
      method: "GET",
    }),
  },
  math: {
    type: "math",
    label: "Math",
    description: "Calculate value",
    icon: "Calculator",
    defaults: () => ({
      operation: "Add",
      valueA: 0,
      valueB: 0,
    }),
  },
  filter: {
    type: "filter",
    label: "Filter",
    description: "Branch logic",
    icon: "Filter",
    defaults: () => ({
      condition: "score > 0.8",
    }),
  },
  delay: {
    type: "delay",
    label: "Delay",
    description: "Wait step",
    icon: "Timer",
    defaults: () => ({
      delayMs: 1000,
    }),
  },
  merge: {
    type: "merge",
    label: "Merge",
    description: "Combine inputs",
    icon: "GitMerge",
    defaults: () => ({
      strategy: "Append",
    }),
  },
};

export const NODE_PALETTE = Object.values(NODE_DEFINITIONS);

export const getNodeDefinition = (type) => NODE_DEFINITIONS[type];

export const createPipelineNode = ({ id, type, position }) => {
  const definition = getNodeDefinition(type);
  const defaults = definition?.defaults?.(id) ?? {};

  return {
    id,
    type,
    position,
    data: {
      id,
      nodeType: type,
      ...defaults,
    },
  };
};
