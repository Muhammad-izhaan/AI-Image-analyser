const express = require('express');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const path = require('path');

const app = express();
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB file limit
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Public Groq API Key (for demonstration purposes)
const GROQ_API_KEY = 'gsk_xxxxxxxxxxxxxxxxxxxxxxxx';

async function analyzeImage(imageData, question = "What's in this image?") {
    try {
        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: "llama-3.2-11b-vision-preview",
                messages: [
                    {
                        role: "user",
                        content: [
                            { type: "text", text: question },
                            { type: "image_url", image_url: { url: imageData } }
                        ]
                    }
                ],
                max_tokens: 300
            },
            {
                headers: {
                    'Authorization': `Bearer ${GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error analyzing image:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/analyze-url', async (req, res) => {
    try {
        const { imageUrl, question } = req.body;
        const analysis = await analyzeImage(imageUrl, question);
        res.json({ analysis });
    } catch (error) {
        res.status(500).json({ error: 'Failed to analyze image' });
    }
});

app.post('/analyze-upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image uploaded' });
        }

        const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
        const question = req.body.question || "What's in this image?";
        
        const analysis = await analyzeImage(base64Image, question);
        res.json({ analysis });
    } catch (error) {
        res.status(500).json({ error: 'Failed to analyze image' });
    }
});

// Serverless function export for Vercel
module.exports = app;
