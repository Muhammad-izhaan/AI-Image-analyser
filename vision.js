const axios = require('axios');
const fs = require('fs');

// Configure API key
const GROQ_API_KEY = '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';

// Function to analyze image from URL
async function analyzeImageFromUrl(imageUrl, question = "What's in this image?") {
    try {
        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "text",
                                text: question
                            },
                            {
                                type: "image_url",
                                image_url: {
                                    url: imageUrl
                                }
                            }
                        ]
                    }
                ],
                model: "llama-3.2-11b-vision-preview",
                temperature: 1,
                max_tokens: 1024,
                top_p: 1,
                stream: false
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
        console.error('Error analyzing image from URL:', error.response?.data || error.message);
        throw error;
    }
}

// Function to analyze local image
async function analyzeLocalImage(imagePath, question = "What's in this image?") {
    try {
        // Read and convert image to base64
        const imageBuffer = fs.readFileSync(imagePath);
        const base64Image = imageBuffer.toString('base64');
        const dataUrl = `data:image/jpeg;base64,${base64Image}`;

        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "text",
                                text: question
                            },
                            {
                                type: "image_url",
                                image_url: {
                                    url: dataUrl
                                }
                            }
                        ]
                    }
                ],
                model: "llama-3.2-11b-vision-preview",
                temperature: 1,
                max_tokens: 1024,
                top_p: 1,
                stream: false
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
        console.error('Error analyzing local image:', error.response?.data || error.message);
        throw error;
    }
}

// Export the functions
module.exports = {
    analyzeImageFromUrl,
    analyzeLocalImage
};
