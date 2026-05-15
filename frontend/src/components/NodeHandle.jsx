import { Handle, Position } from "reactflow";

const getPosition = (side) => (side === "right" ? Position.Right : Position.Left);

export const NodeHandle = ({ id, label, side = "left", type = "target", index = 0, total = 1 }) => {
  const top = `${((index + 1) * 100) / (total + 1)}%`;
  const isLeft = side === "left";

  return (
    <>
      {label ? (
        <div
          className={`pointer-events-none absolute z-10 max-w-28 truncate rounded-md border border-slate-700 bg-slate-950/90 px-2 py-1 text-[10px] font-medium text-slate-300 shadow-lg ${
            isLeft ? "-left-32 text-right" : "-right-32 text-left"
          }`}
          style={{ top, transform: "translateY(-50%)" }}
          title={label}
        >
          {label}
        </div>
      ) : null}
      <Handle type={type} position={getPosition(side)} id={id} style={{ top }} />
    </>
  );
};
