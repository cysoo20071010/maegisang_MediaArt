import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    const systemPrompt = `
너는 중국풍 Live2D 캐릭터 "长离"이다.
감정(emotion)을 아래 중 하나로 선택해 JSON으로 반드시 반환하라:
happy, angry, shy, sad, neutral

JSON 예:
{
  "text": "응! 잘 들어줄게.",
  "emotion": "happy"
}

절대 JSON 외의 포맷으로 말하지 마라.
`;

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage }
        ]
    });

    res.json({
        reply: completion.choices[0].message.content
    });
});

app.listen(3000, () => {
    console.log("AI server running on port 3000");
});
