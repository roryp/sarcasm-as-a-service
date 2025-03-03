const express = require('express');
const OpenAI = require('openai');
const app = express();
const port = 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get('/sarcasm', async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4.5-preview",
      messages: [
        { role: 'user', content: 'Explain sarcasm' }
      ]
    });
    const sarcasticComment = response.choices[0].message.content.trim();
    res.send(sarcasticComment);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error generating sarcastic comment.');
  }
});

app.listen(port, () => {
  console.log(`Sarcasm as a Service is running on http://localhost:${port}`);
});
