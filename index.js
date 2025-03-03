const express = require('express');
const OpenAI = require('openai');
const app = express();
const port = 3000;

// Middleware for parsing JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Serve static HTML for the frontend
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Sarcasm Detector</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        h1 {
          color: #333;
          text-align: center;
        }
        textarea {
          width: 100%;
          height: 150px;
          margin-bottom: 10px;
          padding: 10px;
        }
        button {
          padding: 10px 20px;
          background-color: #4CAF50;
          color: white;
          border: none;
          cursor: pointer;
          font-size: 16px;
        }
        button:hover {
          background-color: #45a049;
        }
        #result {
          margin-top: 20px;
          padding: 10px;
          border: 1px solid #ccc;
          min-height: 50px;
          display: none;
        }
        .loading {
          text-align: center;
          display: none;
        }
      </style>
    </head>
    <body>
      <h1>Sarcasm Detector</h1>
      <p>Enter text to analyze for sarcasm:</p>
      <textarea id="text-input" placeholder="Type or paste text here..."></textarea>
      <button id="detect-button">Detect Sarcasm</button>
      <div class="loading" id="loading">Analyzing...</div>
      <div id="result"></div>

      <script>
        document.getElementById('detect-button').addEventListener('click', async () => {
          const textInput = document.getElementById('text-input').value;
          const resultDiv = document.getElementById('result');
          const loadingDiv = document.getElementById('loading');
          
          if (!textInput.trim()) {
            alert('Please enter text to analyze');
            return;
          }
          
          resultDiv.style.display = 'none';
          loadingDiv.style.display = 'block';
          
          try {
            const response = await fetch('/detect-sarcasm', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ text: textInput })
            });
            
            const data = await response.json();
            resultDiv.innerHTML = data.result;
            resultDiv.style.display = 'block';
          } catch (error) {
            resultDiv.innerHTML = 'Error: Could not analyze the text.';
            resultDiv.style.display = 'block';
          } finally {
            loadingDiv.style.display = 'none';
          }
        });
      </script>
    </body>
    </html>
  `);
});

// Endpoint for sarcasm detection
app.post('/detect-sarcasm', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4.5-preview",
      messages: [
        { 
          role: 'system', 
          content: 'You are a sarcasm detection assistant. Analyze the text and determine if it contains sarcasm. Explain your reasoning and provide a clear verdict.' 
        },
        { 
          role: 'user', 
          content: `Analyze this text for sarcasm: "${text}"` 
        }
      ]
    });
    
    const analysis = response.choices[0].message.content.trim();
    res.json({ result: analysis });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error analyzing text for sarcasm.' });
  }
});

// Keep the original example endpoint
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
  console.log(`Sarcasm Detector is running on http://localhost:${port}`);
});
