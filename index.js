const express = require('express');
const OpenAI = require('openai');
const app = express();
const port = 3000;

// Middleware for parsing JSON requests
app.use(express.json({limit: '10mb'})); // Increased limit for image data
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
          margin-right: 10px;
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
        .tab {
          overflow: hidden;
          border: 1px solid #ccc;
          background-color: #f1f1f1;
          margin-bottom: 20px;
        }
        .tab button {
          background-color: inherit;
          float: left;
          border: none;
          outline: none;
          cursor: pointer;
          padding: 14px 16px;
          transition: 0.3s;
          color: black;
        }
        .tab button:hover {
          background-color: #ddd;
        }
        .tab button.active {
          background-color: #ccc;
        }
        .tabcontent {
          display: none;
          padding: 6px 12px;
          border: 1px solid #ccc;
          border-top: none;
        }
        #webcam-container {
          width: 100%;
          text-align: center;
        }
        #webcam {
          width: 100%;
          max-width: 640px;
          height: auto;
          border: 1px solid #ccc;
        }
        #snapshot-preview {
          margin-top: 20px;
          max-width: 320px;
          display: none;
          border: 1px solid #ddd;
        }
        .webcam-buttons {
          margin-top: 10px;
        }
      </style>
    </head>
    <body>
      <h1>Sarcasm Detector</h1>
      
      <div class="tab">
        <button class="tablinks active" onclick="openTab(event, 'TextAnalysis')">Text Analysis</button>
        <button class="tablinks" onclick="openTab(event, 'WebcamAnalysis')">Webcam Analysis</button>
      </div>
      
      <div id="TextAnalysis" class="tabcontent" style="display: block;">
        <p>Enter text to analyze for sarcasm:</p>
        <textarea id="text-input" placeholder="Type or paste text here..."></textarea>
        <button id="detect-button">Detect Sarcasm</button>
      </div>
      
      <div id="WebcamAnalysis" class="tabcontent">
        <p>Capture facial expression to analyze for sarcasm:</p>
        <div id="webcam-container">
          <video id="webcam" autoplay playsinline></video>
          <canvas id="canvas" style="display:none;"></canvas>
          <img id="snapshot-preview" alt="Snapshot preview">
          <div class="webcam-buttons">
            <button id="start-camera">Start Camera</button>
            <button id="take-snapshot" disabled>Take Snapshot</button>
            <button id="analyze-snapshot" disabled>Analyze Expression</button>
          </div>
        </div>
      </div>
      
      <div class="loading" id="loading">Analyzing...</div>
      <div id="result"></div>

      <script>
        // Tab functionality
        function openTab(evt, tabName) {
          var i, tabcontent, tablinks;
          tabcontent = document.getElementsByClassName("tabcontent");
          for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
          }
          tablinks = document.getElementsByClassName("tablinks");
          for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
          }
          document.getElementById(tabName).style.display = "block";
          evt.currentTarget.className += " active";
        }
        
        // Text analysis functionality
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
        
        // Webcam functionality
        let stream = null;
        const video = document.getElementById('webcam');
        const canvas = document.getElementById('canvas');
        const snapshotPreview = document.getElementById('snapshot-preview');
        const startCameraBtn = document.getElementById('start-camera');
        const takeSnapshotBtn = document.getElementById('take-snapshot');
        const analyzeSnapshotBtn = document.getElementById('analyze-snapshot');
        
        startCameraBtn.addEventListener('click', async () => {
          try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
            startCameraBtn.disabled = true;
            takeSnapshotBtn.disabled = false;
            startCameraBtn.textContent = 'Camera Active';
          } catch (error) {
            console.error('Error accessing webcam:', error);
            alert('Could not access the webcam. Please make sure you have granted permission.');
          }
        });
        
        takeSnapshotBtn.addEventListener('click', () => {
          const context = canvas.getContext('2d');
          // Set canvas dimensions to match video dimensions
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          // Draw the current video frame to the canvas
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          // Convert the canvas to a data URL and set it as the source for the preview image
          const imageDataURL = canvas.toDataURL('image/png');
          snapshotPreview.src = imageDataURL;
          snapshotPreview.style.display = 'block';
          analyzeSnapshotBtn.disabled = false;
        });
        
        analyzeSnapshotBtn.addEventListener('click', async () => {
          const resultDiv = document.getElementById('result');
          const loadingDiv = document.getElementById('loading');
          
          if (!snapshotPreview.src || snapshotPreview.style.display === 'none') {
            alert('Please take a snapshot first');
            return;
          }
          
          resultDiv.style.display = 'none';
          loadingDiv.style.display = 'block';
          
          try {
            const response = await fetch('/detect-facial-sarcasm', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ image: snapshotPreview.src })
            });
            
            const data = await response.json();
            resultDiv.innerHTML = data.result;
            resultDiv.style.display = 'block';
          } catch (error) {
            console.error('Error analyzing facial expression:', error);
            resultDiv.innerHTML = 'Error: Could not analyze the facial expression.';
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

// Endpoint for text-based sarcasm detection
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

// New endpoint for webcam-based sarcasm detection
app.post('/detect-facial-sarcasm', async (req, res) => {
  try {
    const { image } = req.body;
    
    if (!image) {
      return res.status(400).json({ error: 'Image data is required' });
    }
    
    // Extract the base64 data from the data URL
    const base64Data = image.split(',')[1];
    
    // Use OpenAI's vision capabilities to analyze the facial expression
    const response = await openai.chat.completions.create({
      model: "gpt-4.5-preview",
      messages: [
        { 
          role: 'system', 
          content: 'You are a facial expression analysis expert specializing in detecting sarcasm. Analyze the provided image and determine if the person appears to be expressing sarcasm. Look for facial cues like smirking, raised eyebrows, eye rolls, or other indicators of sarcastic expression. Provide a thorough analysis and a clear verdict.' 
        },
        { 
          role: 'user', 
          content: [
            { type: 'text', text: 'Analyze this facial expression for signs of sarcasm:' },
            { 
              type: 'image_url', 
              image_url: {
                url: `data:image/png;base64,${base64Data}`
              }
            }
          ]
        }
      ],
      max_tokens: 500
    });
    
    const analysis = response.choices[0].message.content.trim();
    res.json({ result: analysis });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error analyzing facial expression for sarcasm.' });
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
