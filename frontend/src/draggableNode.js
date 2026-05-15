// draggableNode.js

import {
  Calculator,
  Filter,
  GitMerge,
  Globe,
  LogIn,
  LogOut,
  Sparkles,
  TextCursorInput,
  Timer,
} from "lucide-react";

const icons = {
  Calculator,
  Filter,
  GitMerge,
  Globe,
  LogIn,
  LogOut,
  Sparkles,
  TextCursorInput,
  Timer,
};

export const DraggableNode = ({ node }) => {
    const Icon = icons[node.icon];

    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className="toolbar-button"
        onDragStart={(event) => onDragStart(event, node.type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        draggable
      >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-300">
            {Icon ? <Icon size={18} /> : null}
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold text-slate-100">{node.label}</span>
            <span className="block whitespace-nowrap text-xs text-slate-400">{node.description}</span>
          </span>
      </div>
    );
  };
  
