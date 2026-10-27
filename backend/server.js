import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/", (_req, res) => {
  res.status(200).send("Akshay AI Backend is running!");
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "akshay-ai-backend" });
});

app.post("/api/chat", async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: "OPENAI_API_KEY is missing in Render Environment." });
  }

  let messages = req.body?.messages;
  if (!Array.isArray(messages) && typeof req.body?.message === "string") {
    messages = [{ role: "user", content: req.body.message }];
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Please send a message." });
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
        {
          role: "system",
          content: "You are Akshay AI, a helpful, clear, friendly assistant. Answer in the language used by the user when practical."
        },
        ...messages.map(({ role, content }) => ({ role, content }))
      ]
    });

    return res.json({
      reply: completion.choices[0]?.message?.content || "I couldn't generate a response. Please try again."
    });
  } catch (error) {
    const status = error?.status;
    const code = error?.code || error?.error?.code;
    console.error("AI request failed:", status || error?.message || "unknown error", code || "");

    if (status === 429) {
      return res.status(429).json({
        error: "OpenAI API returned 429: quota or rate limit reached. Check API billing, available credits, and usage limits."
      });
    }
    if (status === 401) {
      return res.status(401).json({
        error: "OpenAI API key was rejected (401). Check that OPENAI_API_KEY is the correct active API key in Render."
      });
    }
    return res.status(502).json({ error: "AI provider request failed. Check Render logs and OpenAI API settings." });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Akshay AI backend listening on port ${port}`);
});