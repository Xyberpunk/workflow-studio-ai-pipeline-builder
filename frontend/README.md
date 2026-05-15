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
/api/pipelines/parse
```

For local development with the FastAPI server running on port `8000`, use:

```bash
REACT_APP_API_BASE_URL=http://localhost:8000
```

On Vercel, leave `REACT_APP_API_BASE_URL` unset so the app uses the same-origin `/api` route.

## Note

This app still uses Create React App because the assessment starter was CRA-based.
