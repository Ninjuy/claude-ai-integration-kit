# claude-ai-integration-kit

> A practical TypeScript toolkit for integrating Claude AI into your applications.
> Covers the most common patterns: chat, streaming, tool use, document Q&A with prompt caching, and vision.

---

## Examples

| # | File | What it shows |
|---|------|--------------|
| 01 | `basic-chat.ts` | Single-turn & multi-turn conversation |
| 02 | `streaming.ts` | Real-time token streaming |
| 03 | `tool-use.ts` | Function calling / agentic loop |
| 04 | `document-qa.ts` | Document Q&A + prompt caching |
| 05 | `vision.ts` | Image analysis (URL & base64) |

---

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/YOUR_USERNAME/claude-ai-integration-kit.git
cd claude-ai-integration-kit
npm install
```

### 2. Set up environment

```bash
cp .env.example .env
# Add your Anthropic API key to .env
```

Get your API key at [console.anthropic.com](https://console.anthropic.com).

### 3. Run any example

```bash
npm run example:chat      # Basic chat
npm run example:stream    # Streaming
npm run example:tools     # Tool use / function calling
npm run example:docs      # Document Q&A with prompt caching
npm run example:vision    # Image analysis
```

---

## Project Structure

```
src/
├── lib/
│   ├── client.ts       # Anthropic client setup
│   └── types.ts        # Shared TypeScript types
├── examples/
│   ├── 01-basic-chat.ts
│   ├── 02-streaming.ts
│   ├── 03-tool-use.ts
│   ├── 04-document-qa.ts
│   └── 05-vision.ts
└── index.ts            # Public exports
```

---

## Extending This Kit

This is intentionally a **starting point**, not a framework. Fork it and:

- Replace mock tool functions in `03-tool-use.ts` with your own APIs
- Swap the sample document in `04-document-qa.ts` with your own content
- Add your own examples in `src/examples/`
- Build a web interface on top using Next.js or Express

---

## Key Concepts

**Prompt Caching** (`04-document-qa.ts`) — Mark large, stable content with `cache_control: ephemeral`. Claude caches it for up to 5 minutes, cutting costs and latency on repeated requests.

**Agentic Loop** (`03-tool-use.ts`) — When Claude wants to call a tool, you run the function and send the result back. Repeat until `stop_reason !== "tool_use"`.

**Streaming** (`02-streaming.ts`) — Use `messages.stream()` instead of `messages.create()` for token-by-token output, ideal for chat UIs.

---

## Requirements

- Node.js 18+
- TypeScript 5+
- Anthropic API key

## License

MIT
