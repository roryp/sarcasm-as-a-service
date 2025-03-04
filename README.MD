# Sarcasm Detector

This project is a simple web application that detects sarcasm in a given text using OpenAI's GPT-4.5-preview model. The application provides a frontend where users can input text, use their webcam to analyze facial expressions, or record audio for sarcasm detection.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- OpenAI API key
- Web browser with webcam access permissions
- Microphone access for audio analysis features

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/roryp/sarcasm-as-a-service.git
    cd sarcasm-as-a-service
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Set the `OPENAI_API_KEY` environment variable with your OpenAI API key:
    ```sh
    export OPENAI_API_KEY=your_openai_api_key
    ```

## Running the Application

1. Start the server:
    ```sh
    node index.js
    ```

2. Open your browser and navigate to `http://localhost:3000` to access the Sarcasm Detector application.

## Features

### Text-based Sarcasm Detection
- Enter text in the provided textarea
- Click "Detect Sarcasm" to analyze the text
- Review the analysis results below

### Webcam-based Sarcasm Detection
- Switch to the "Webcam Analysis" tab
- Click "Start Camera" to enable your webcam
- Click "Take Snapshot" to capture your facial expression
- Click "Analyze Expression" to detect sarcasm in your facial expression
- Review the analysis results below

### NEW: Audio-based Sarcasm Detection
- Switch to the "Audio Analysis" tab
- Click "Start Recording" to enable your microphone
- Speak your message with or without sarcasm
- Click "Stop Recording" when finished
- Review and play back your recording
- Click "Analyze Voice" to detect sarcasm in your voice recording
- Review the transcription and analysis results below

## Endpoints

- `GET /`: Serves the static HTML frontend.
- `POST /detect-sarcasm`: Analyzes the provided text for sarcasm.
- `POST /detect-facial-sarcasm`: Analyzes a facial expression image for signs of sarcasm.
- `POST /detect-voice-sarcasm`: Transcribes audio and analyzes it for signs of sarcasm.
- `GET /sarcasm`: Provides a sarcastic comment explaining sarcasm.

## Example Usage

### Text Analysis
1. Open the application in your browser.
2. Make sure you're on the "Text Analysis" tab.
3. Enter the text you want to analyze for sarcasm in the provided textarea.
4. Click the "Detect Sarcasm" button.
5. The result will be displayed below the button.

### Webcam Analysis
1. Open the application in your browser.
2. Click on the "Webcam Analysis" tab.
3. Click the "Start Camera" button to activate your webcam (you may need to grant permission).
4. Make a facial expression that may convey sarcasm.
5. Click the "Take Snapshot" button to capture your expression.
6. Review the snapshot and click "Analyze Expression" to detect sarcasm.
7. The analysis result will be displayed below.

### Audio Analysis
1. Open the application in your browser.
2. Click on the "Audio Analysis" tab.
3. Click the "Start Recording" button to activate your microphone (you may need to grant permission).
4. Speak your message with the desired tone (sarcastic or not).
5. Click the "Stop Recording" button when finished.
6. You can play back your recording to verify the audio quality.
7. Click the "Analyze Voice" button to process your recording.
8. The system will transcribe your speech and provide an analysis of sarcasm detection.
9. Both the transcription and analysis will be displayed below.

## Note
For the webcam and audio features to work properly, you'll need to:
- Use a browser that supports the MediaDevices API
- Grant the website permission to access your camera and microphone
- Have adequate lighting for clear facial expression capture
- Ensure your microphone is functioning properly and speak clearly for accurate transcription

## License

This project is licensed under the ISC License.
