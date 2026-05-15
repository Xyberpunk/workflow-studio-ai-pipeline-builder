import { Globe } from "lucide-react";
import { BaseNode } from "../components/BaseNode";

export const APINode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="API"
    subtitle="HTTP request"
    icon={Globe}
    color="sky"
    status="http"
    inputs={[{ id: `${id}-input`, label: "input" }]}
    outputs={[{ id: `${id}-response`, label: "response" }]}
    fields={[
      { type: "text", label: "URL", key: "url", placeholder: "https://api.example.com" },
      { type: "select", label: "Method", key: "method", options: ["GET", "POST", "PUT", "PATCH", "DELETE"] },
      { type: "textarea", label: "Headers", key: "headers", rows: 3, mono: true, helper: "JSON object. Variables like {{token}} are supported." },
    ]}
  />
);
