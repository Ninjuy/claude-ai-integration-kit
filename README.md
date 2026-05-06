# claude-ai-integration-kit

> **EN:** A practical TypeScript toolkit for integrating Claude AI into your applications.
> Covers the most common patterns: chat, streaming, tool use, document Q&A with prompt caching, and vision.
>
> **TH:** ชุดเครื่องมือ TypeScript สำหรับเชื่อมต่อ Claude AI เข้ากับแอปพลิเคชันของคุณ
> ครอบคลุม pattern ที่ใช้บ่อยที่สุด: chat, streaming, tool use, document Q&A พร้อม prompt caching และ vision

---

## Examples / ตัวอย่าง

| # | File | EN | TH |
|---|------|----|----|
| 01 | `basic-chat.ts` | Single-turn & multi-turn conversation | สนทนาแบบ single-turn และ multi-turn |
| 02 | `streaming.ts` | Real-time token streaming | แสดงผลแบบ real-time ทีละ token |
| 03 | `tool-use.ts` | Function calling / agentic loop | เรียกใช้ฟังก์ชัน / agentic loop |
| 04 | `document-qa.ts` | Document Q&A + prompt caching | ถาม-ตอบจากเอกสาร + prompt caching |
| 05 | `vision.ts` | Image analysis (URL & base64) | วิเคราะห์ภาพ (URL และ base64) |

---

## Getting Started / เริ่มต้นใช้งาน

### 1. Clone & Install / โคลนและติดตั้ง

```bash
git clone https://github.com/Ninjuy/claude-ai-integration-kit.git
cd claude-ai-integration-kit
npm install
```

### 2. Set up environment / ตั้งค่า environment

```bash
cp .env.example .env
# EN: Add your Anthropic API key to .env
# TH: เพิ่ม Anthropic API key ของคุณใน .env
```

Get your API key at [console.anthropic.com](https://console.anthropic.com)

### 3. Run any example / รันตัวอย่าง

```bash
npm run example:chat      # Basic chat / แชทพื้นฐาน
npm run example:stream    # Streaming / แสดงผลแบบ streaming
npm run example:tools     # Tool use / function calling
npm run example:docs      # Document Q&A with prompt caching
npm run example:vision    # Image analysis / วิเคราะห์ภาพ
```

---

## Project Structure / โครงสร้างโปรเจกต์

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

## Key Concepts / แนวคิดหลัก

**Prompt Caching** (`04-document-qa.ts`)
- **EN:** Mark large, stable content with `cache_control: ephemeral`. Claude caches it for up to 5 minutes, cutting costs and latency on repeated requests.
- **TH:** ทำเครื่องหมายเนื้อหาขนาดใหญ่ที่ไม่เปลี่ยนแปลงด้วย `cache_control: ephemeral` Claude จะ cache ไว้ได้นานถึง 5 นาที ช่วยลดค่าใช้จ่ายและ latency

**Agentic Loop** (`03-tool-use.ts`)
- **EN:** When Claude wants to call a tool, you run the function and send the result back. Repeat until `stop_reason !== "tool_use"`.
- **TH:** เมื่อ Claude ต้องการเรียกใช้ tool ให้รันฟังก์ชันแล้วส่งผลกลับไป วนซ้ำจนกว่า `stop_reason !== "tool_use"`

**Streaming** (`02-streaming.ts`)
- **EN:** Use `messages.stream()` instead of `messages.create()` for token-by-token output, ideal for chat UIs.
- **TH:** ใช้ `messages.stream()` แทน `messages.create()` เพื่อแสดงผลทีละ token เหมาะสำหรับ chat UI

---

## Requirements / ความต้องการของระบบ

- Node.js 18+
- TypeScript 5+
- Anthropic API key

## License

MIT
