import { useMemo } from "react";
import { parseVariables } from "../utils/parseVariables";

export const useVariableParser = (text) => {
  return useMemo(() => parseVariables(text), [text]);
};
