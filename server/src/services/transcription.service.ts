import fs from 'fs';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

export class TranscriptionService {
    private genAI: GoogleGenerativeAI;
    private model: any;

    constructor() {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.warn('GEMINI_API_KEY is not set. Transcription will fail.');
        }
        this.genAI = new GoogleGenerativeAI(apiKey || 'dummy_key');
        // Using Gemini 1.5 Flash - the most cost-effective model
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    }

    async transcribeAudio(filePath: string): Promise<string> {
        try {
            // Read the audio file
            const audioData = fs.readFileSync(filePath);
            const base64Audio = audioData.toString('base64');

            // Determine MIME type based on file extension
            const mimeType = filePath.endsWith('.mp3') ? 'audio/mp3' : 'audio/mpeg';

            // Create the prompt for transcription
            const prompt = `Please transcribe the following audio file. Provide only the transcribed text without any additional commentary or formatting.`;

            // Send to Gemini API
            const result = await this.model.generateContent([
                {
                    inlineData: {
                        mimeType: mimeType,
                        data: base64Audio,
                    },
                },
                { text: prompt },
            ]);

            const response = await result.response;
            const text = response.text();

            return text.trim();
        } catch (error: any) {
            console.error('Transcription error:', error);
            throw new Error(`Failed to transcribe audio: ${error.message}`);
        }
    }
}
