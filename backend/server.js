import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/", (_req, res) => {
  res.status(200).send("Akshay AI Backend is running!");
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "akshay-ai-backend", provider: "gemini" });
});

app.post("/api/chat", async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: "GEMINI_API_KEY is missing in Render Environment." });
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
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
      systemInstruction: "You are Akshay AI, a helpful, clear, friendly assistant. Answer in the language used by the user when practical."
    });

    const history = messages.slice(0, -1).map(({ role, content }) => ({
      role: role === "assistant" ? "model" : "user",
      parts: [{ text: content }]
    }));
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== "user") {
      return res.status(400).json({ error: "The latest message must be from the user." });
    }

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastMessage.content);
    const reply = result.response.text();

    return res.json({ reply: reply || "I couldn't generate a response. Please try again." });
  } catch (error) {
    const status = error?.status || error?.statusCode;
    console.error("Gemini request failed:", status || error?.message || "unknown error");
    if (status === 429) {
      return res.status(429).json({ error: "Gemini free-tier limit reached for now. Check your AI Studio quota or try again later." });
    }
    if (status === 401 || status === 403) {
      return res.status(status).json({ error: "Gemini API key or project access was rejected. Check the active API key and free-tier availability in Google AI Studio." });
    }
    return res.status(502).json({ error: "Gemini AI request failed. Check the API key, selected model, and Render logs." });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Akshay AI Gemini backend listening on port ${port}`);
});
