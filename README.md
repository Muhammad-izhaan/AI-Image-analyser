# Groq Vision Analyzer

This web application that demonstrates the capabilities of Groq's Vision AI API. This application allows users to analyze images either by providing a URL or uploading an image file.

## Features

- Analyze images from URLs
- Upload and analyze local images
- Ask custom questions about images
- Clean and intuitive user interface
- Real-time analysis results

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open your browser and visit `http://localhost:3000`

## Usage

1. **Analyze Image from URL**:
   - Paste an image URL in the first input field
   - Optionally, enter a specific question about the image
   - Click "Analyze URL"

2. **Upload and Analyze Image**:
   - Click "Choose File" and select an image from your computer
   - Optionally, enter a specific question about the image
   - Click "Analyze Upload"

## Technical Details

- Built with Node.js and Express
- Uses Groq's Vision AI API for image analysis
- Frontend styled with Tailwind CSS
- Supports both URL and file upload methods

## Limitations

- Maximum file size: 20MB for URL images, 4MB for uploaded images
- One image per request
- Requires active internet connection
