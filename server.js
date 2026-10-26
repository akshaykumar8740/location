import express from "express";
import OpenAI from "openai";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = process.env.PORT || 3001;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.post("/api/chat", async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: "OPENAI_API_KEY server environment variable is missing." });
  }

  const messages = req.body?.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Please send at least one message." });
  }
  if (messages.length > 40 || messages.some((m) =>
    !m || !["user", "assistant"].includes(m.role) ||
    typeof m.content !== "string" || m.content.length > 12000
  )) {
    return res.status(400).json({ error: "Invalid messages or conversation too long." });
  }

  try {
    const openai = new OpenAI({ apiKey });
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are Akshay AI, a helpful, clear, friendly assistant. Answer in the language used by the user when practical." },
        ...messages.map(({ role, content }) => ({ role, content })),
      ],
    });
    return res.json({ reply: completion.choices[0]?.message?.content || "I couldn't generate a response. Please try again." });
  } catch (error) {
    console.error("AI request failed:", error?.status || error?.message || "unknown error");
    return res.status(502).json({ error: "AI request failed. Check the server logs and API configuration." });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist")));
  app.get("*", (_req, res) => res.sendFile(path.join(__dirname, "dist", "index.html")));
}

app.listen(port, () => console.log(`Akshay AI server listening on port ${port}`));
