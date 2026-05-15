const variantClasses = {
  slate: {
    icon: "from-slate-500 to-slate-300 text-slate-950",
    badge: "bg-slate-500/15 text-slate-300",
    ring: "ring-slate-400/30",
  },
  cyan: {
    icon: "from-cyan-400 to-blue-400 text-slate-950",
    badge: "bg-cyan-400/15 text-cyan-200",
    ring: "ring-cyan-400/30",
  },
  indigo: {
    icon: "from-indigo-400 to-violet-400 text-white",
    badge: "bg-indigo-400/15 text-indigo-200",
    ring: "ring-indigo-400/30",
  },
  emerald: {
    icon: "from-emerald-400 to-teal-300 text-slate-950",
    badge: "bg-emerald-400/15 text-emerald-200",
    ring: "ring-emerald-400/30",
  },
  amber: {
    icon: "from-amber-300 to-orange-400 text-slate-950",
    badge: "bg-amber-300/15 text-amber-200",
    ring: "ring-amber-300/30",
  },
  sky: {
    icon: "from-sky-400 to-indigo-400 text-white",
    badge: "bg-sky-400/15 text-sky-200",
    ring: "ring-sky-400/30",
  },
  fuchsia: {
    icon: "from-fuchsia-400 to-pink-400 text-white",
    badge: "bg-fuchsia-400/15 text-fuchsia-200",
    ring: "ring-fuchsia-400/30",
  },
  lime: {
    icon: "from-lime-300 to-emerald-400 text-slate-950",
    badge: "bg-lime-300/15 text-lime-200",
    ring: "ring-lime-300/30",
  },
  rose: {
    icon: "from-rose-300 to-orange-300 text-slate-950",
    badge: "bg-rose-300/15 text-rose-200",
    ring: "ring-rose-300/30",
  },
  purple: {
    icon: "from-purple-400 to-cyan-400 text-white",
    badge: "bg-purple-400/15 text-purple-200",
    ring: "ring-purple-400/30",
  },
  teal: {
    icon: "from-teal-300 to-emerald-400 text-slate-950",
    badge: "bg-teal-300/15 text-teal-200",
    ring: "ring-teal-300/30",
  },
  violet: {
    icon: "from-violet-400 to-indigo-300 text-white",
    badge: "bg-violet-400/15 text-violet-200",
    ring: "ring-violet-400/30",
  },
  orange: {
    icon: "from-orange-300 to-red-400 text-slate-950",
    badge: "bg-orange-300/15 text-orange-200",
    ring: "ring-orange-300/30",
  },
};

const aliases = {
  default: "slate",
  input: "cyan",
  llm: "indigo",
  output: "emerald",
  text: "amber",
  api: "sky",
  math: "fuchsia",
  filter: "lime",
  delay: "rose",
  merge: "purple",
};

export const useNodeStyles = (variant = "slate") => variantClasses[aliases[variant] ?? variant] ?? variantClasses.slate;
