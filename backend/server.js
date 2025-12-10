import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  const messages = [
    {
      role: "system",
      content:
        "너는 감정이 있는 캐릭터 NPC이다. 반드시 JSON으로 답하고, text와 emotion을 포함한다."
    },
    {
      role: "user",
      content: userMessage
    }
  ];

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages
  });

  res.json({
    reply: completion.choices[0].message.content
  });
});

app.listen(3000, () => console.log("AI server running"));
