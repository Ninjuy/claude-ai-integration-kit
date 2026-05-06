/**
 * Example 03: Tool Use (Function Calling)
 * Let Claude call your functions to get real data.
 */
import Anthropic from "@anthropic-ai/sdk";
import { claude, DEFAULT_MODEL } from "../lib/client";

const tools: Anthropic.Tool[] = [
  {
    name: "get_weather",
    description: "Get the current weather for a given city.",
    input_schema: {
      type: "object",
      properties: {
        city: { type: "string", description: "City name, e.g. Bangkok" },
        unit: {
          type: "string",
          enum: ["celsius", "fahrenheit"],
          description: "Temperature unit",
        },
      },
      required: ["city"],
    },
  },
  {
    name: "calculate",
    description: "Perform basic arithmetic calculations.",
    input_schema: {
      type: "object",
      properties: {
        expression: {
          type: "string",
          description: "Math expression to evaluate, e.g. '15 * 24 + 10'",
        },
      },
      required: ["expression"],
    },
  },
];

function getWeather(city: string, unit = "celsius"): string {
  // Mock weather data — replace with real API call
  const mock: Record<string, number> = {
    Bangkok: 34, "New York": 18, London: 12, Tokyo: 22,
  };
  const temp = mock[city] ?? 25;
  const display = unit === "fahrenheit" ? Math.round((temp * 9) / 5 + 32) : temp;
  return JSON.stringify({ city, temperature: display, unit, condition: "Sunny" });
}

function calculate(expression: string): string {
  try {
    const result = Function(`"use strict"; return (${expression})`)();
    return JSON.stringify({ expression, result });
  } catch {
    return JSON.stringify({ error: "Invalid expression" });
  }
}

function executeTool(name: string, input: Record<string, string>): string {
  switch (name) {
    case "get_weather": return getWeather(input.city, input.unit);
    case "calculate":   return calculate(input.expression);
    default:            return JSON.stringify({ error: "Unknown tool" });
  }
}

async function runWithTools(userMessage: string): Promise<void> {
  console.log("User:", userMessage, "\n");

  const messages: Anthropic.MessageParam[] = [
    { role: "user", content: userMessage },
  ];

  let response = await claude.messages.create({
    model: DEFAULT_MODEL,
    max_tokens: 1024,
    tools,
    messages,
  });

  // Agentic loop — keep going until Claude stops calling tools
  while (response.stop_reason === "tool_use") {
    const toolUseBlocks = response.content.filter(
      (b): b is Anthropic.ToolUseBlock => b.type === "tool_use"
    );

    const toolResults: Anthropic.ToolResultBlockParam[] = toolUseBlocks.map((block) => {
      console.log(`[Tool] ${block.name}(${JSON.stringify(block.input)})`);
      const result = executeTool(block.name, block.input as Record<string, string>);
      console.log(`[Result] ${result}\n`);
      return { type: "tool_result", tool_use_id: block.id, content: result };
    });

    messages.push({ role: "assistant", content: response.content });
    messages.push({ role: "user", content: toolResults });

    response = await claude.messages.create({
      model: DEFAULT_MODEL,
      max_tokens: 1024,
      tools,
      messages,
    });
  }

  const finalText = response.content.find((b): b is Anthropic.TextBlock => b.type === "text");
  if (finalText) console.log("Claude:", finalText.text);
}

(async () => {
  await runWithTools("What's the weather in Bangkok and Tokyo? Also, what's 1234 * 5678?");
})();
