import { Timer } from "lucide-react";
import { BaseNode } from "../components/BaseNode";

export const DelayNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Delay"
    subtitle="Async wait state"
    icon={Timer}
    color="rose"
    status="async"
    inputs={[{ id: `${id}-input`, label: "flow" }]}
    outputs={[{ id: `${id}-done`, label: "done" }]}
    fields={[{ type: "number", label: "Delay (ms)", key: "delayMs", min: 0, step: 100 }]}
  >
    <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-950/50 px-3 py-2 text-xs text-slate-300">
      <span className="h-2 w-2 animate-pulse rounded-full bg-rose-300 shadow-[0_0_16px_rgba(253,164,175,0.8)]" />
      Awaiting async continuation
    </div>
  </BaseNode>
);
