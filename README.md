# Workflow Studio

A modern AI workflow automation editor . The project includes a polished React + ReactFlow frontend and a FastAPI backend that validates submitted pipelines as directed acyclic graphs.

## What This Builds

Workflow Studio is a dark-themed SaaS-style pipeline builder where users can drag nodes onto a canvas, configure each node, connect workflows visually, and submit the graph for backend validation.

Core capabilities:

- Modular node architecture powered by a reusable `BaseNode`
- Configurable node fields, input handles, output handles, icons, and layout
- ReactFlow canvas with drag-and-drop node creation
- Dynamic Text node resizing
- `{{variable}}` parsing in Text nodes with generated input handles
- Toast-based validation feedback with `react-hot-toast`
- FastAPI endpoint for parsing submitted pipelines
- DAG validation using Kahn's topological sorting algorithm

## Tech Stack

Frontend:

- React 18
- ReactFlow
- TailwindCSS
- Zustand
- React Hooks
- react-hot-toast
- lucide-react

Backend:

- Python
- FastAPI
- Pydantic
- Uvicorn

## Project Structure

```text
frontend_technical_assessment/
|-- backend/
|   |-- __init__.py
|   |-- main.py
|   `-- requirements.txt
|
|-- api/
|   `-- index.py
|
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |   |-- BaseNode.jsx
|   |   |   |-- Layout.jsx
|   |   |   |-- NodeCard.jsx
|   |   |   |-- NodeField.jsx
|   |   |   |-- NodeHandle.jsx
|   |   |   `-- SubmitButton.jsx
|   |   |-- hooks/
|   |   |   |-- useDynamicSize.js
|   |   |   |-- useNodeStyles.js
|   |   |   `-- useVariableParser.js
|   |   |-- nodes/
|   |   |   |-- APINode.jsx
|   |   |   |-- DelayNode.jsx
|   |   |   |-- FilterNode.jsx
|   |   |   |-- InputNode.jsx
|   |   |   |-- LLMNode.jsx
|   |   |   |-- MathNode.jsx
|   |   |   |-- MergeNode.jsx
|   |   |   |-- OutputNode.jsx
|   |   |   `-- TextNode.jsx
|   |   |-- styles/
|   |   |   `-- globals.css
|   |   |-- utils/
|   |   |   |-- graphUtils.js
|   |   |   |-- nodeFactory.js
|   |   |   `-- parseVariables.js
|   |   |-- App.js
|   |   |-- draggableNode.js
|   |   |-- store.js
|   |   |-- submit.js
|   |   |-- toolbar.js
|   |   `-- ui.js
|   |-- package.json
|   |-- postcss.config.js
|   `-- tailwind.config.js
|
|-- .gitignore
|-- requirements.txt
|-- vercel.json
`-- README.md
```

## Frontend Architecture

The frontend is organized around configuration-driven nodes. Individual node files define what a node needs, while shared components own the rendering.

`BaseNode.jsx` is responsible for:

- consistent card layout
- node headers and icons
- input and output handle rendering
- configurable form fields
- selected and hover states
- dynamic dimensions when provided by a node

Example node pattern:

```jsx
<BaseNode
  title="API"
  inputs={[{ id: `${id}-input`, label: "input" }]}
  outputs={[{ id: `${id}-response`, label: "response" }]}
  fields={[
    { type: "text", label: "URL", key: "url" },
    { type: "select", label: "Method", key: "method", options: ["GET", "POST"] },
  ]}
/>
```

This keeps new node creation small and predictable.

## Implemented Nodes

- Input Node: external values such as text, files, numbers, or JSON
- Output Node: terminal pipeline output
- Text Node: prompt/template text with dynamic variables
- LLM Node: model and temperature configuration
- API Node: URL and HTTP method configuration
- Math Node: operation selector and numeric fallbacks
- Filter Node: condition field with true/false outputs
- Delay Node: delay duration with async status visualization
- Merge Node: multiple inputs with one merged output

## Text Node Variable Parsing

The Text node supports variable syntax like:

```text
Summarize {{document}} using {{style}}
```

Variables are parsed with:

```js
/{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g
```

Valid variables:

- `{{input}}`
- `{{document}}`
- `{{user_name}}`

Invalid variables are ignored by the parser:

- `{{123}}`
- `{{hello-world}}`

Each valid variable creates a left-side input handle on the Text node.

## Backend API

### Health Check

```http
GET /
```

Response:

```json
{
  "Ping": "Pong"
}
```

### Parse Pipeline

```http
POST /pipelines/parse
```

Request body:

```json
{
  "nodes": [
    {
      "id": "input-1",
      "type": "customInput",
      "position": { "x": 100, "y": 200 },
      "data": {}
    }
  ],
  "edges": [
    {
      "id": "edge-1",
      "source": "input-1",
      "target": "text-1",
      "sourceHandle": "input-1-value",
      "targetHandle": "text-1-var-document"
    }
  ]
}
```

Response:

```json
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true
}
```

## DAG Validation

The backend validates workflows with Kahn's topological sorting algorithm:

1. Build an adjacency list from submitted edges.
2. Track indegree count for every node.
3. Queue all nodes with indegree `0`.
4. Visit queued nodes and decrement downstream indegrees.
5. If every node is visited, the graph is a DAG.
6. If any node remains unvisited, the graph contains a cycle.

Malformed edges that reference missing nodes are treated as invalid DAGs.

## Local Development

Open two terminals from the project root.

### 1. Start the Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

On Windows PowerShell:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend URL:

```text
http://localhost:8000
```

### 2. Start the Frontend

```bash
cd frontend
npm install
npm start
```

Frontend URL:

```text
http://localhost:3000
```

The frontend submits to `http://localhost:8000` by default. To point it at another backend, set:

```bash
REACT_APP_API_BASE_URL=http://localhost:8000
```

An example file is provided at `frontend/.env.example`.

In production on Vercel, no API environment variable is required. The frontend calls the same-origin API path:

```text
/api/pipelines/parse
```

## Validation Commands

Run a frontend production build:

```bash
cd frontend
npm run build
```

Run backend smoke checks:

```bash
cd backend
source .venv/bin/activate
python - <<'PY'
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

payload = {
    "nodes": [{"id": "a"}, {"id": "b"}, {"id": "c"}],
    "edges": [{"source": "a", "target": "b"}, {"source": "b", "target": "c"}],
}

print(client.post("/pipelines/parse", json=payload).json())
PY
```

Expected response:

```json
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true
}
```

## Vercel Deployment

This repository is configured to deploy the frontend and backend in a single Vercel project.

Vercel files:

- `vercel.json`: builds the React app from `frontend/`, serves `frontend/build`, and rewrites `/api/*` to the Python function.
- `api/index.py`: Vercel Python entrypoint that imports the FastAPI app from `backend/main.py`.
- `requirements.txt`: Python runtime dependencies for Vercel.

Recommended Vercel settings:

```text
Framework Preset: Other
Root Directory: ./
Build Command: cd frontend && npm install && npm run build
Output Directory: frontend/build
Install Command: leave empty
```

Environment variables:

- None required for production.
- Do not set `REACT_APP_API_BASE_URL` on Vercel unless you intentionally want to call a different API host.

After deployment, the API will be available on the same domain:

```text
https://your-vercel-domain.vercel.app/api/pipelines/parse
```

## GitHub Push Checklist

Before pushing:

```bash
git status
git add .
git commit -m "Build workflow studio assessment"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

Do not commit:

- `node_modules/`
- `frontend/build/`
- `backend/.venv/`
- `__pycache__/`
- `.env` files
- local logs and editor metadata

These are covered by the root `.gitignore`.

## Notes

- The project still uses Create React App because that was the provided starter setup.
- `npm audit` reports vulnerabilities from the inherited `react-scripts` dependency chain. The app builds and runs, but a production migration to Vite would be the clean long-term path.
- The backend is deployed on Vercel as a Python Function, not as a long-running `uvicorn` server.
