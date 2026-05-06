/**
 * Example 05: Vision — Image Analysis
 * Send images to Claude for analysis (URL or base64).
 */
import Anthropic from "@anthropic-ai/sdk";
import * as fs from "fs";
import * as path from "path";
import { claude, DEFAULT_MODEL } from "../lib/client";

async function analyzeImageFromUrl(imageUrl: string, question: string): Promise<void> {
  console.log("Analyzing image from URL...");
  console.log("Q:", question);

  const response = await claude.messages.create({
    model: DEFAULT_MODEL,
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: [
          { type: "image", source: { type: "url", url: imageUrl } },
          { type: "text", text: question },
        ],
      },
    ],
  });

  const text = response.content[0];
  if (text.type === "text") console.log("A:", text.text, "\n");
}

async function analyzeImageFromFile(imagePath: string, question: string): Promise<void> {
  const absolutePath = path.resolve(imagePath);
  if (!fs.existsSync(absolutePath)) {
    console.log(`File not found: ${absolutePath} — skipping file example.\n`);
    return;
  }

  console.log("Analyzing image from file...");
  console.log("Q:", question);

  const imageData = fs.readFileSync(absolutePath).toString("base64");
  const ext = path.extname(imagePath).slice(1).toLowerCase();
  const mediaTypeMap: Record<string, Anthropic.Base64ImageSource["media_type"]> = {
    jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png",
    gif: "image/gif", webp: "image/webp",
  };
  const mediaType = mediaTypeMap[ext] ?? "image/jpeg";

  const response = await claude.messages.create({
    model: DEFAULT_MODEL,
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: mediaType, data: imageData } },
          { type: "text", text: question },
        ],
      },
    ],
  });

  const text = response.content[0];
  if (text.type === "text") console.log("A:", text.text, "\n");
}

(async () => {
  // URL example — uses a public image
  await analyzeImageFromUrl(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/280px-PNG_transparency_demonstration_1.png",
    "Describe what you see in this image."
  );

  // File example — place any image at assets/sample.jpg to test
  await analyzeImageFromFile("assets/sample.jpg", "What is in this image?");
})();
