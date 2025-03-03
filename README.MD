# Sarcasm Detector

This project is a simple web application that detects sarcasm in a given text using OpenAI's GPT-4.5-preview model. The application provides a frontend where users can input text or use their webcam to analyze facial expressions for sarcasm detection.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- OpenAI API key
- Web browser with webcam access permissions

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/sarcasm-as-a-service.git
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

### NEW: Webcam-based Sarcasm Detection
- Switch to the "Webcam Analysis" tab
- Click "Start Camera" to enable your webcam
- Click "Take Snapshot" to capture your facial expression
- Click "Analyze Expression" to detect sarcasm in your facial expression
- Review the analysis results below

## Endpoints

- `GET /`: Serves the static HTML frontend.
- `POST /detect-sarcasm`: Analyzes the provided text for sarcasm.
- `POST /detect-facial-sarcasm`: Analyzes a facial expression image for signs of sarcasm.
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

## Note
For the webcam feature to work properly, you'll need to:
- Use a browser that supports the MediaDevices API
- Grant the website permission to access your camera
- Have adequate lighting for clear facial expression capture

## License

This project is licensed under the ISC License.