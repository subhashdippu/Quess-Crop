const express = require("express");
const router = express.Router();
const axios = require("axios");

const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;

// helper to call OpenRouter deepseek model
async function callOpenRouter(prompt) {
  const payload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  };
  const res = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    payload,
    {
      headers: {
        Authorization: `Bearer ${OPENROUTER_KEY}`,
        "Content-Type": "application/json",
      },
      timeout: 20000,
    }
  );
  // adapt to returned shape
  const reply =
    res.data?.choices?.[0]?.message?.content || res.data?.output || "";
  return reply;
}

// POST /ai/enhance - body: { noteId, action } action: 'summarize'|'grammar'|'expand'
router.post("/enhance", async (req, res) => {
  try {
    const { content, action } = req.body;
    let prompt = "";

    if (action === "summarize") {
      prompt = `Summarize the following note in 3-4 concise bullet points:\n\n${content}`;
    } else if (action === "grammar") {
      prompt = `Improve the grammar and style of the following text. Keep the meaning same:\n\n${content}`;
    } else if (action === "expand") {
      prompt = `Expand the following note to include more details and examples. Keep it relevant:\n\n${content}`;
    } else {
      prompt = `Polish the following note:\n\n${content}`;
    }

    const aiResponse = await callOpenRouter(prompt);
    res.json({ enhanced: aiResponse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI call failed", details: err.message });
  }
});

module.exports = router;
