import { Globe } from "lucide-react";
import { BaseNode } from "../components/BaseNode";

export const APINode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="API"
    subtitle="HTTP request"
    icon={Globe}
    variant="api"
    inputs={[{ id: `${id}-input`, label: "input" }]}
    outputs={[{ id: `${id}-response`, label: "response" }]}
    fields={[
      { type: "text", label: "URL", key: "url", placeholder: "https://api.example.com" },
      { type: "select", label: "Method", key: "method", options: ["GET", "POST", "PUT", "PATCH", "DELETE"] },
    ]}
  />
);
