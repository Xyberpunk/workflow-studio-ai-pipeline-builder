import { useLayoutEffect, useMemo, useRef, useState } from "react";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const useDynamicSize = (value = "", options = {}) => {
  const textareaRef = useRef(null);
  const observerRef = useRef(null);
  const [measuredHeight, setMeasuredHeight] = useState(options.minHeight ?? 180);
  const minWidth = options.minWidth ?? 320;
  const maxWidth = options.maxWidth ?? 520;
  const minHeight = options.minHeight ?? 180;

  // Text areas are measured from their scroll height so template content never
  // hides behind a fixed node body.
  useLayoutEffect(() => {
    const element = textareaRef.current;
    if (!element) {
      return;
    }

    element.style.height = "auto";
    const nextHeight = element.scrollHeight;
    element.style.height = `${nextHeight}px`;
    setMeasuredHeight(Math.max(minHeight, nextHeight + 112));
  }, [minHeight, value]);

  useLayoutEffect(() => {
    const element = textareaRef.current;
    if (!element || typeof ResizeObserver === "undefined") {
      return undefined;
    }

    observerRef.current = new ResizeObserver(() => {
      setMeasuredHeight(Math.max(minHeight, element.scrollHeight + 112));
    });
    observerRef.current.observe(element);

    return () => observerRef.current?.disconnect();
  }, [minHeight]);

  const dimensions = useMemo(() => {
    const lines = value.split("\n");
    const longestLine = lines.reduce((max, line) => Math.max(max, line.length), 0);
    const width = clamp(280 + longestLine * 4.8, minWidth, maxWidth);

    return {
      width,
      minHeight: measuredHeight,
    };
  }, [maxWidth, measuredHeight, minWidth, value]);

  return { textareaRef, dimensions };
};
