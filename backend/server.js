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
    console.error("AI request failed:", error?.status || error?.message || "unknown error");
    return res.status(502).json({ error: "AI request failed. Check Render logs and API billing/key settings." });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Akshay AI backend listening on port ${port}`);
});
