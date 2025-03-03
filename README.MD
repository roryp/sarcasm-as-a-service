# Sarcasm Detector

This project is a simple web application that detects sarcasm in a given text using OpenAI's GPT-4.5-preview model. The application provides a frontend where users can input text and get an analysis of whether the text contains sarcasm.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- OpenAI API key

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

## Endpoints

- `GET /`: Serves the static HTML frontend.
- `POST /detect-sarcasm`: Analyzes the provided text for sarcasm.
- `GET /sarcasm`: Provides a sarcastic comment explaining sarcasm.

## Example Usage

1. Open the application in your browser.
2. Enter the text you want to analyze for sarcasm in the provided textarea.
3. Click the "Detect Sarcasm" button.
4. The result will be displayed below the button.

## License

This project is licensed under the ISC License.