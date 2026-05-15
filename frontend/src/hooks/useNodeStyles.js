const variantClasses = {
  default: "from-slate-500 to-slate-300 text-slate-950",
  input: "from-cyan-400 to-blue-400 text-slate-950",
  llm: "from-indigo-400 to-violet-400 text-white",
  output: "from-emerald-400 to-teal-300 text-slate-950",
  text: "from-amber-300 to-orange-400 text-slate-950",
  api: "from-sky-400 to-indigo-400 text-white",
  math: "from-fuchsia-400 to-pink-400 text-white",
  filter: "from-lime-300 to-emerald-400 text-slate-950",
  delay: "from-rose-300 to-orange-300 text-slate-950",
  merge: "from-purple-400 to-cyan-400 text-white",
};

export const useNodeStyles = (variant = "default") => {
  return {
    icon: variantClasses[variant] ?? variantClasses.default,
  };
};
