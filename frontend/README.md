# Workflow Studio Frontend

This is the React frontend for Workflow Studio, a polished AI workflow builder created for the VectorShift frontend technical assessment.

The full project documentation lives in the root [`README.md`](../README.md).

## Scripts

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Build for production:

```bash
npm run build
```

Run tests:

```bash
npm test
```

## Frontend Features

- ReactFlow workflow canvas
- Tailwind dark SaaS interface
- Configuration-driven node architecture
- Dynamic Text node variable handles
- Toast-based backend validation feedback

## Backend URL

The frontend submits pipelines to:

```text
http://localhost:8000
```

Override it with:

```bash
REACT_APP_API_BASE_URL=http://localhost:8000
```

## Note

This app still uses Create React App because the assessment starter was CRA-based.
