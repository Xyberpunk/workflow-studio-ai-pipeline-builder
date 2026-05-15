import { create } from "zustand";
import { addEdge, applyEdgeChanges, applyNodeChanges, MarkerType } from "reactflow";

const STORAGE_KEY = "workflow-studio:v2";
const MAX_HISTORY = 30;

const edgeStyle = {
  type: "smoothstep",
  animated: true,
  markerEnd: { type: MarkerType.ArrowClosed, color: "#818cf8", height: 18, width: 18 },
  style: { stroke: "#818cf8", strokeWidth: 2 },
  labelStyle: { fill: "#cbd5e1", fontSize: 11, fontWeight: 600 },
  labelBgStyle: { fill: "#0f172a", fillOpacity: 0.85 },
  labelBgPadding: [8, 4],
  labelBgBorderRadius: 8,
};

const snapshot = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  nodeIDs: state.nodeIDs,
});

const persist = (state) => {
  try {
    if (typeof localStorage === "undefined") {
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot(state)));
  } catch {
    // Persistence should never block graph editing.
  }
};

const loadInitialState = () => {
  try {
    if (typeof localStorage === "undefined") {
      return { nodes: [], edges: [], nodeIDs: {} };
    }
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored?.nodes && stored?.edges) {
      return {
        nodes: stored.nodes,
        edges: stored.edges,
        nodeIDs: stored.nodeIDs ?? {},
      };
    }
  } catch {
    // Ignore corrupt local storage and boot with a clean workspace.
  }

  return { nodes: [], edges: [], nodeIDs: {} };
};

const pushHistory = (state) => ({
  history: [...state.history.slice(-MAX_HISTORY + 1), snapshot(state)],
  future: [],
});

export const useWorkflowStore = create((set, get) => ({
  ...loadInitialState(),
  history: [],
  future: [],
  selectedNodeId: null,
  validation: null,
  sidebarQuery: "",
  lastFieldHistoryAt: 0,

  getNodeID: (type) => {
    const nodeIDs = { ...get().nodeIDs };
    nodeIDs[type] = (nodeIDs[type] ?? 0) + 1;
    set({ nodeIDs });
    return `${type}-${nodeIDs[type]}`;
  },

  addNode: (node) => {
    set((state) => {
      const next = { ...state, ...pushHistory(state), nodes: [...state.nodes, node], selectedNodeId: node.id };
      persist(next);
      return next;
    });
  },

  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set((state) => {
      const now = Date.now();
      const shouldTrack = now - state.lastFieldHistoryAt > 750;
      const next = {
        ...state,
        ...(shouldTrack ? pushHistory(state) : {}),
        lastFieldHistoryAt: shouldTrack ? now : state.lastFieldHistoryAt,
        nodes: state.nodes.map((node) =>
          node.id === nodeId ? { ...node, data: { ...node.data, [fieldName]: fieldValue } } : node,
        ),
      };
      persist(next);
      return next;
    });
  },

  onNodesChange: (changes) => {
    set((state) => {
      const shouldTrack = changes.some(
        (change) =>
          ["remove", "add"].includes(change.type) ||
          (change.type === "position" && change.dragging === false),
      );
      const next = {
        ...state,
        ...(shouldTrack ? pushHistory(state) : {}),
        nodes: applyNodeChanges(changes, state.nodes),
      };
      persist(next);
      return next;
    });
  },

  onEdgesChange: (changes) => {
    set((state) => {
      const shouldTrack = changes.some((change) => ["remove", "add"].includes(change.type));
      const next = {
        ...state,
        ...(shouldTrack ? pushHistory(state) : {}),
        edges: applyEdgeChanges(changes, state.edges),
      };
      persist(next);
      return next;
    });
  },

  onConnect: (connection) => {
    set((state) => {
      const label = connection.sourceHandle?.split("-").slice(-1)[0] ?? "flow";
      const next = {
        ...state,
        ...pushHistory(state),
        edges: addEdge({ ...connection, ...edgeStyle, label }, state.edges),
      };
      persist(next);
      return next;
    });
  },

  setSelectedNodeId: (selectedNodeId) => set({ selectedNodeId }),
  setSidebarQuery: (sidebarQuery) => set({ sidebarQuery }),
  setValidation: (validation) => set({ validation }),

  deleteSelected: () => {
    const selectedNodeId = get().selectedNodeId;
    if (!selectedNodeId) {
      return;
    }

    set((state) => {
      const next = {
        ...state,
        ...pushHistory(state),
        nodes: state.nodes.filter((node) => node.id !== selectedNodeId),
        edges: state.edges.filter((edge) => edge.source !== selectedNodeId && edge.target !== selectedNodeId),
        selectedNodeId: null,
      };
      persist(next);
      return next;
    });
  },

  clearWorkflow: () => {
    set((state) => {
      const next = {
        ...state,
        ...pushHistory(state),
        nodes: [],
        edges: [],
        selectedNodeId: null,
        validation: null,
      };
      persist(next);
      return next;
    });
  },

  importWorkflow: (pipeline) => {
    set((state) => {
      const next = {
        ...state,
        ...pushHistory(state),
        nodes: Array.isArray(pipeline.nodes) ? pipeline.nodes : [],
        edges: Array.isArray(pipeline.edges) ? pipeline.edges.map((edge) => ({ ...edgeStyle, ...edge })) : [],
        selectedNodeId: null,
        validation: null,
      };
      persist(next);
      return next;
    });
  },

  undo: () => {
    set((state) => {
      const previous = state.history[state.history.length - 1];
      if (!previous) {
        return state;
      }

      const next = {
        ...state,
        ...previous,
        history: state.history.slice(0, -1),
        future: [snapshot(state), ...state.future],
        selectedNodeId: null,
      };
      persist(next);
      return next;
    });
  },

  redo: () => {
    set((state) => {
      const future = state.future[0];
      if (!future) {
        return state;
      }

      const next = {
        ...state,
        ...future,
        history: [...state.history, snapshot(state)].slice(-MAX_HISTORY),
        future: state.future.slice(1),
        selectedNodeId: null,
      };
      persist(next);
      return next;
    });
  },
}));
