const VARIABLE_PATTERN = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;

export const parseVariables = (text = "") => {
  const matches = new Set();
  let match;

  while ((match = VARIABLE_PATTERN.exec(text)) !== null) {
    matches.add(match[1]);
  }

  return Array.from(matches);
};

export const variablePattern = VARIABLE_PATTERN;
