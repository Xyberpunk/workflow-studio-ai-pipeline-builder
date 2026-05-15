import { motion } from "framer-motion";
import { MousePointer2, Sparkles } from "lucide-react";

export const EmptyCanvasState = () => (
  <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6">
    <motion.div
      className="max-w-md rounded-3xl border border-slate-700/80 bg-slate-950/70 p-6 text-center shadow-2xl shadow-slate-950/40 backdrop-blur-xl"
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <motion.div
        className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-200 ring-1 ring-indigo-400/30"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles size={22} />
      </motion.div>
      <h2 className="text-lg font-semibold text-slate-50">Start Building Your AI Workflow</h2>
      <p className="mt-2 text-sm leading-6 text-slate-400">
        Drag nodes from the sidebar or use quick-add to create your first orchestration graph.
      </p>
      <div className="mt-5 flex items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/75 px-4 py-3 text-xs font-medium text-slate-300">
        <MousePointer2 size={15} className="text-indigo-300" />
        Inputs -> AI -> Logic -> Output
      </div>
    </motion.div>
  </div>
);
