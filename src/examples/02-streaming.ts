/**
 * Example 02: Streaming
 * Real-time token streaming for responsive UX.
 */
import { claude, DEFAULT_MODEL } from "../lib/client";

async function streamResponse(prompt: string): Promise<string> {
  console.log("User:", prompt);
  process.stdout.write("Claude: ");

  let fullText = "";

  const stream = claude.messages.stream({
    model: DEFAULT_MODEL,
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  for await (const chunk of stream) {
    if (
      chunk.type === "content_block_delta" &&
      chunk.delta.type === "text_delta"
    ) {
      process.stdout.write(chunk.delta.text);
      fullText += chunk.delta.text;
    }
  }

  console.log("\n");

  const finalMessage = await stream.finalMessage();
  console.log(
    `[Tokens used — input: ${finalMessage.usage.input_tokens}, output: ${finalMessage.usage.output_tokens}]`
  );

  return fullText;
}

(async () => {
  await streamResponse("Explain async/await in TypeScript with a short example.");
  await streamResponse("What are generics and when should I use them?");
})();
