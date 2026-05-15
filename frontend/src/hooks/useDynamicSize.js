import { useLayoutEffect, useMemo, useRef } from "react";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const useDynamicSize = (value = "", options = {}) => {
  const textareaRef = useRef(null);
  const minWidth = options.minWidth ?? 320;
  const maxWidth = options.maxWidth ?? 520;

  // Text areas are measured from their scroll height so template content never
  // hides behind a fixed node body.
  useLayoutEffect(() => {
    const element = textareaRef.current;
    if (!element) {
      return;
    }

    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  }, [value]);

  const dimensions = useMemo(() => {
    const lines = value.split("\n");
    const longestLine = lines.reduce((max, line) => Math.max(max, line.length), 0);
    const width = clamp(280 + longestLine * 4.8, minWidth, maxWidth);

    return {
      width,
      minHeight: 180,
    };
  }, [maxWidth, minWidth, value]);

  return { textareaRef, dimensions };
};
