# AI Code Reviewer

An AI-powered code review application that provides instant feedback on your code using OpenAI's GPT-3.5 model. The application features a modern, ChatGPT-like interface for submitting code and receiving detailed reviews.

![AI Code Reviewer Interface](image.png)
*Screenshot: AI Code Reviewer providing detailed feedback with code quality scores and recommendations*

## Features

- 🤖 AI-powered code analysis
- 💻 Modern, responsive UI
- 🔍 Comprehensive code review feedback
- ⚡ Real-time responses
- 🎨 Dark mode interface
- 💬 Chat-like conversation history

## Tech Stack

### Backend
- Node.js
- Express.js
- OpenAI API
- CORS
- dotenv

### Frontend
- React.js
- Material-UI (MUI)
- Axios
- React Syntax Highlighter

## Prerequisites

Before running the application, make sure you have:
- Node.js (v14 or higher)
- npm (Node Package Manager)
- OpenAI API key

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Start the backend server:
   - For development:
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm start
     ```

The backend server will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

The frontend application will run on `http://localhost:3000`

## API Endpoints

### Health Check
- **GET /** - Check if the server is running
  ```bash
  curl http://localhost:3000/
  ```

### Code Review
- **POST /review-code** - Submit code for review
  ```bash
  curl -X POST http://localhost:3000/review-code \
       -H "Content-Type: application/json" \
       -d '{"code": "your code here"}'
  ```

## Project Structure

```
code-reviewer/
├── backend/
│   ├── node_modules/
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── .gitignore
└── README.md
```

## Contributing

Feel free to:
- Open issues for bugs or feature requests
- Submit Pull Requests to improve the application
- Share feedback for improvements

## Note

Remember to:
- Never commit your `.env` file or expose your OpenAI API key
- Keep your dependencies updated
- Follow the existing code style and conventions
