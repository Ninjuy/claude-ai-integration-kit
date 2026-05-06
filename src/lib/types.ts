import Anthropic from "@anthropic-ai/sdk";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ToolDefinition {
  name: string;
  description: string;
  input_schema: {
    type: "object";
    properties: Record<string, { type: string; description: string }>;
    required: string[];
  };
}

export type Message = Anthropic.MessageParam;
