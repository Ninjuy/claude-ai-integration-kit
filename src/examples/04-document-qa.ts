/**
 * Example 04: Document Q&A with Prompt Caching
 * Process large documents efficiently — cache the document content
 * so repeated questions don't re-send the full text each time.
 */
import Anthropic from "@anthropic-ai/sdk";
import { claude, DEFAULT_MODEL } from "../lib/client";

const SAMPLE_DOCUMENT = `
# TypeScript Best Practices Guide

## 1. Use Strict Mode
Always enable strict mode in tsconfig.json. It catches common bugs at compile time:
- Null checks prevent null/undefined errors
- Strict function types catch callback mismatches
- No implicit any forces explicit typing

## 2. Prefer Interfaces Over Type Aliases for Objects
Interfaces are extendable and produce clearer error messages.
Use type aliases for unions, intersections, and primitives.

## 3. Use Generics for Reusable Code
Generic functions and classes work with any type while preserving type safety.
Avoid using 'any' — use generics instead.

## 4. Leverage Utility Types
TypeScript ships with Partial<T>, Required<T>, Pick<T>, Omit<T>, Readonly<T>.
These save time and keep types DRY.

## 5. Discriminated Unions for State Management
Use a literal type field to narrow union types safely.
This pattern works well for API responses, Redux actions, and error handling.

## 6. Avoid Enums — Use Const Objects Instead
Enums have runtime overhead and can cause issues with tree-shaking.
Const objects with 'as const' give the same benefits without the downsides.

## 7. Error Handling with Type Guards
Create type guard functions using 'is' return types.
This allows TypeScript to narrow types inside conditional blocks.

## 8. Async/Await Over Raw Promises
Always use async/await with try/catch instead of .then/.catch chains.
It produces more readable code and better stack traces.
`.trim();

async function documentQA(questions: string[]): Promise<void> {
  console.log("Document loaded. Asking questions with prompt caching...\n");

  // The document is marked with cache_control so it's cached after the first request.
  // Subsequent questions only send the (small) question, not the full document again.
  const systemWithCache: Anthropic.TextBlockParam = {
    type: "text",
    text: `You are a helpful assistant. Answer questions based ONLY on the document below.\n\n${SAMPLE_DOCUMENT}`,
    // @ts-expect-error — cache_control is a beta feature not yet in stable types
    cache_control: { type: "ephemeral" },
  };

  for (const question of questions) {
    console.log("Q:", question);

    const response = await claude.messages.create({
      model: DEFAULT_MODEL,
      max_tokens: 512,
      system: [systemWithCache],
      messages: [{ role: "user", content: question }],
      betas: ["prompt-caching-2024-07-31"],
    } as Parameters<typeof claude.messages.create>[0]);

    const text = response.content[0];
    if (text.type === "text") console.log("A:", text.text);

    // @ts-expect-error — cache stats in beta usage
    const usage = response.usage as { cache_creation_input_tokens?: number; cache_read_input_tokens?: number };
    if (usage.cache_read_input_tokens) {
      console.log(`   [Cache HIT — saved ${usage.cache_read_input_tokens} tokens]\n`);
    } else if (usage.cache_creation_input_tokens) {
      console.log(`   [Cache CREATED — ${usage.cache_creation_input_tokens} tokens cached]\n`);
    }
  }
}

(async () => {
  await documentQA([
    "What does the guide say about enums?",
    "Why should I use async/await instead of promises?",
    "What utility types does TypeScript provide according to this document?",
  ]);
})();
