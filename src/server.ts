import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Mistral } from "@mistralai/mistralai";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const apiKey = process.env.MISTRAL_API_KEY;
if (!apiKey) {
  console.error("MISTRAL_API_KEY is not set. Add it to your .env file.");
  process.exit(1);
}

const client = new Mistral({ apiKey });
const MODEL = "mistral-small-latest";

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

app.post("/api/chat", async (req, res) => {
  const messages: ChatMessage[] = req.body?.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Request body must include a non-empty 'messages' array." });
  }

  try {
    const response = await client.chat.complete({
      model: MODEL,
      messages,
    });
    const content = response.choices?.[0]?.message?.content;
    res.json({ reply: typeof content === "string" ? content : "" });
  } catch (err) {
    console.error(err);
    res.status(502).json({ error: "Mistral API request failed." });
  }
});

const PORT = Number(process.env.PORT ?? 3000);
app.listen(PORT, () => {
  console.log(`Chat app running at http://localhost:${PORT}`);
});
