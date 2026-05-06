/**
 * claude-ai-integration-kit
 *
 * Run individual examples:
 *   npm run example:chat
 *   npm run example:stream
 *   npm run example:tools
 *   npm run example:docs
 *   npm run example:vision
 */

export { claude, DEFAULT_MODEL, DEFAULT_MAX_TOKENS } from "./lib/client";
export type { ChatMessage, ToolDefinition, Message } from "./lib/types";
