import { useNodeStyles } from "../hooks/useNodeStyles";

export const NodeHeader = ({ title, subtitle, icon: Icon, color = "slate", status }) => {
  const styles = useNodeStyles(color);

  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        {Icon ? (
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${styles.icon}`}>
            <Icon size={18} strokeWidth={2.3} />
          </div>
        ) : null}
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-slate-50">{title}</div>
          {subtitle ? <div className="truncate text-xs text-slate-400">{subtitle}</div> : null}
        </div>
      </div>
      {status ? (
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${styles.badge}`}>
          {status}
        </span>
      ) : null}
    </div>
  );
};
