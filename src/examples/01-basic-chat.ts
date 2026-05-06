/**
 * Example 01: Basic Chat
 * Single-turn and multi-turn conversation with Claude.
 */
import { claude, DEFAULT_MODEL, DEFAULT_MAX_TOKENS } from "../lib/client";
import type { ChatMessage } from "../lib/types";

async function singleTurn(): Promise<void> {
  console.log("=== Single Turn ===");

  const response = await claude.messages.create({
    model: DEFAULT_MODEL,
    max_tokens: DEFAULT_MAX_TOKENS,
    messages: [{ role: "user", content: "What is TypeScript in one sentence?" }],
  });

  const text = response.content[0];
  if (text.type === "text") console.log("Claude:", text.text);
}

async function multiTurn(): Promise<void> {
  console.log("\n=== Multi Turn ===");

  const history: ChatMessage[] = [];

  const turns = [
    "My name is Alex. I'm learning TypeScript.",
    "What should I learn after understanding basic types?",
    "Can you give me one quick exercise based on what we discussed?",
  ];

  for (const userMessage of turns) {
    console.log("User:", userMessage);
    history.push({ role: "user", content: userMessage });

    const response = await claude.messages.create({
      model: DEFAULT_MODEL,
      max_tokens: DEFAULT_MAX_TOKENS,
      messages: history,
    });

    const text = response.content[0];
    if (text.type === "text") {
      console.log("Claude:", text.text, "\n");
      history.push({ role: "assistant", content: text.text });
    }
  }
}

(async () => {
  await singleTurn();
  await multiTurn();
})();
