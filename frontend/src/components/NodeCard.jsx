import { motion } from "framer-motion";

export const NodeCard = ({ children, dimensions }) => {
  return (
    <motion.div
      className="workflow-node-card group relative rounded-2xl border border-slate-700 bg-slate-800/90 p-4 text-slate-50 shadow-lg ring-1 ring-transparent backdrop-blur-xl transition-all duration-200 hover:scale-[1.01] hover:border-indigo-400/70 hover:ring-indigo-400/20"
      style={dimensions}
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.18 }}
    >
      <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      {children}
    </motion.div>
  );
};
