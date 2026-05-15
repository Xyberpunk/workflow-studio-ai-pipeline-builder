import {
  Binary,
  Braces,
  Calculator,
  Code2,
  Filter,
  GitBranch,
  GitMerge,
  Globe,
  LogIn,
  LogOut,
  MessageSquareText,
  Sparkles,
  TextCursorInput,
  Timer,
} from "lucide-react";
import { APINode } from "../nodes/APINode";
import { ConditionalNode } from "../nodes/ConditionalNode";
import { DelayNode } from "../nodes/DelayNode";
import { FilterNode } from "../nodes/FilterNode";
import { InputNode } from "../nodes/InputNode";
import { JSONNode } from "../nodes/JSONNode";
import { LLMNode } from "../nodes/LLMNode";
import { MathNode } from "../nodes/MathNode";
import { MergeNode } from "../nodes/MergeNode";
import { OutputNode } from "../nodes/OutputNode";
import { PromptTemplateNode } from "../nodes/PromptTemplateNode";
import { TextNode } from "../nodes/TextNode";

export const iconRegistry = {
  Binary,
  Braces,
  Calculator,
  Code2,
  Filter,
  GitBranch,
  GitMerge,
  Globe,
  LogIn,
  LogOut,
  MessageSquareText,
  Sparkles,
  TextCursorInput,
  Timer,
};

export const nodeRegistry = {
  customInput: InputNode,
  customOutput: OutputNode,
  input: InputNode,
  llm: LLMNode,
  output: OutputNode,
  text: TextNode,
  api: APINode,
  math: MathNode,
  filter: FilterNode,
  delay: DelayNode,
  merge: MergeNode,
  json: JSONNode,
  promptTemplate: PromptTemplateNode,
  conditional: ConditionalNode,
};

export const nodeDefinitions = {
  input: {
    type: "input",
    label: "Input",
    description: "External value",
    category: "Inputs",
    icon: "LogIn",
    color: "cyan",
    defaults: (id) => ({
      inputName: id.replace("input-", "input_"),
      inputType: "Text",
    }),
  },
  llm: {
    type: "llm",
    label: "LLM",
    description: "Generate response",
    category: "AI",
    icon: "Sparkles",
    color: "indigo",
    defaults: () => ({
      model: "gpt-4o-mini",
      temperature: 0.3,
      systemPrompt: "You are a precise AI workflow assistant.",
    }),
  },
  output: {
    type: "output",
    label: "Output",
    description: "Pipeline result",
    category: "Output",
    icon: "LogOut",
    color: "emerald",
    defaults: (id) => ({
      outputName: id.replace("output-", "output_"),
      outputType: "Text",
    }),
  },
  text: {
    type: "text",
    label: "Text",
    description: "Variable-aware text",
    category: "Utilities",
    icon: "TextCursorInput",
    color: "amber",
    defaults: () => ({
      text: "Summarize {{document}} using {{style}}",
    }),
  },
  api: {
    type: "api",
    label: "API",
    description: "HTTP request",
    category: "Utilities",
    icon: "Globe",
    color: "sky",
    defaults: () => ({
      url: "https://api.example.com/data",
      method: "GET",
      headers: '{\n  "Authorization": "Bearer {{token}}"\n}',
    }),
  },
  math: {
    type: "math",
    label: "Math",
    description: "Calculate value",
    category: "Utilities",
    icon: "Calculator",
    color: "fuchsia",
    defaults: () => ({
      operation: "Add",
      valueA: 0,
      valueB: 0,
    }),
  },
  filter: {
    type: "filter",
    label: "Filter",
    description: "Boolean branch",
    category: "Logic",
    icon: "Filter",
    color: "lime",
    defaults: () => ({
      condition: "score > 0.8",
    }),
  },
  delay: {
    type: "delay",
    label: "Delay",
    description: "Async wait",
    category: "Logic",
    icon: "Timer",
    color: "rose",
    defaults: () => ({
      delayMs: 1000,
    }),
  },
  merge: {
    type: "merge",
    label: "Merge",
    description: "Combine inputs",
    category: "Utilities",
    icon: "GitMerge",
    color: "purple",
    defaults: () => ({
      strategy: "Append",
    }),
  },
  json: {
    type: "json",
    label: "JSON",
    description: "Validate payload",
    category: "Utilities",
    icon: "Braces",
    color: "teal",
    defaults: () => ({
      json: '{\n  "status": "ready"\n}',
    }),
  },
  promptTemplate: {
    type: "promptTemplate",
    label: "Prompt",
    description: "LLM template",
    category: "AI",
    icon: "MessageSquareText",
    color: "violet",
    defaults: () => ({
      template: "Write a {{tone}} answer for {{audience}} about {{topic}}.",
      format: "Markdown",
    }),
  },
  conditional: {
    type: "conditional",
    label: "If / Else",
    description: "Route by condition",
    category: "Logic",
    icon: "GitBranch",
    color: "orange",
    defaults: () => ({
      expression: "{{status}} === 'approved'",
    }),
  },
};

export const nodePalette = Object.values(nodeDefinitions);

export const getNodeDefinition = (type) => nodeDefinitions[type];
