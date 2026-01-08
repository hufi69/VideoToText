import fs from 'fs';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

export class TranscriptionService {
    private openai: OpenAI;

    constructor() {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            console.warn('OPENAI_API_KEY is not set. Transcription will fail.');
        }
        this.openai = new OpenAI({
            apiKey: apiKey || 'dummy_key',
        });
    }

    async transcribeAudio(filePath: string): Promise<string> {
        try {
            const transcription = await this.openai.audio.transcriptions.create({
                file: fs.createReadStream(filePath),
                model: 'whisper-1',
            });

            return transcription.text;
        } catch (error) {
            console.error('Transcription error:', error);
            throw new Error('Failed to transcribe audio');
        }
    }
}
