import Anthropic from "@anthropic-ai/sdk";
import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error("ANTHROPIC_API_KEY is required. Copy .env.example to .env and add your key.");
}

export const claude = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const DEFAULT_MODEL = (process.env.MODEL as Anthropic.Model) ?? "claude-sonnet-4-6";
export const DEFAULT_MAX_TOKENS = Number(process.env.MAX_TOKENS) || 1024;
