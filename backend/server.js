require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3000;

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Code review endpoint
app.post('/review-code', async (req, res) => {
    try {
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({ error: 'Code snippet is required' });
        }

        const prompt = `You are a senior software engineer and expert code reviewer. Please analyze the following code snippet in detail and provide a comprehensive review covering the following aspects:
        1. Overall code quality, readability, and maintainability.
        2. Identification of potential bugs or logical errors.
        3. Suggestions for performance improvements and optimization opportunities.
        4. Adherence to best practices and coding standards.
        5. Any security vulnerabilities or unsafe practices that should be addressed.
        6. Evaluation scores on different parameters and suggestions for improvement.
        
        Include specific examples, detailed explanations, and actionable recommendations. If applicable, suggest refactoring strategies or additional tests that could improve the code quality.

Code to review:
${code}`;

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are an experienced software developer providing code reviews. Be concise, specific, and constructive in your feedback."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 1000
        });

        const feedback = completion.choices[0].message.content;
        res.json({ feedback });

    } catch (error) {
        console.error('Error during code review:', error);
        res.status(500).json({ error: 'Failed to review code' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
