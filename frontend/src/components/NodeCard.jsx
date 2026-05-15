export const NodeCard = ({ children, dimensions }) => {
  return (
    <div
      className="workflow-node-card rounded-2xl border border-slate-700 bg-slate-800/95 p-4 text-slate-50 shadow-lg backdrop-blur transition-all duration-200 hover:scale-[1.02] hover:border-indigo-400/70"
      style={dimensions}
    >
      {children}
    </div>
  );
};
