import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useMemo } from "react";
import { iconRegistry, nodePalette } from "../registry/nodeRegistry";
import { useWorkflowStore } from "../store/useWorkflowStore";

const onDragStart = (event, nodeType) => {
  event.dataTransfer.setData("application/reactflow", JSON.stringify({ nodeType }));
  event.dataTransfer.effectAllowed = "move";
};

export const Sidebar = () => {
  const query = useWorkflowStore((state) => state.sidebarQuery);
  const setQuery = useWorkflowStore((state) => state.setSidebarQuery);

  const groupedNodes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return nodePalette
      .filter((node) => {
        if (!normalizedQuery) return true;
        return `${node.label} ${node.description} ${node.category}`.toLowerCase().includes(normalizedQuery);
      })
      .reduce((groups, node) => {
        groups[node.category] = [...(groups[node.category] ?? []), node];
        return groups;
      }, {});
  }, [query]);

  return (
    <aside className="flex h-full w-80 shrink-0 flex-col border-r border-slate-800 bg-slate-950/75 backdrop-blur-xl">
      <div className="border-b border-slate-800 p-4">
        <div className="mb-3">
          <p className="text-sm font-semibold text-slate-100">Node Palette</p>
          <p className="text-xs text-slate-500">Drag building blocks into the workflow.</p>
        </div>
        <label className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-300">
          <Search size={15} className="text-slate-500" />
          <input
            className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500"
            placeholder="Search nodes"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        {Object.entries(groupedNodes).map(([category, nodes]) => (
          <section key={category} className="mb-5">
            <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">{category}</h2>
            <div className="space-y-2">
              {nodes.map((node) => {
                const Icon = iconRegistry[node.icon];
                return (
                  <motion.div
                    key={node.type}
                    className="flex cursor-grab items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/75 p-3 shadow-lg transition hover:-translate-y-0.5 hover:border-indigo-400/70 hover:bg-slate-800 active:cursor-grabbing"
                    draggable
                    whileTap={{ scale: 0.98 }}
                    onDragStart={(event) => onDragStart(event, node.type)}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-300">
                      {Icon ? <Icon size={18} /> : null}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-slate-100">{node.label}</span>
                      <span className="block truncate text-xs text-slate-400">{node.description}</span>
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </aside>
  );
};
