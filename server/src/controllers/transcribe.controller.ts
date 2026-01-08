import { Request, Response } from 'express';
import { VideoService } from '../services/video.service';
import { TranscriptionService } from '../services/transcription.service';
import fs from 'fs';

export class TranscribeController {
    private videoService: VideoService;
    private transcriptionService: TranscriptionService;

    constructor() {
        this.videoService = new VideoService();
        this.transcriptionService = new TranscriptionService();
    }

    transcribeFile = async (req: Request, res: Response): Promise<void> => {
        let audioPath = '';
        try {
            if (!req.file) {
                res.status(400).json({ error: 'No video file uploaded' });
                return;
            }

            const videoPath = req.file.path;

            // Extract audio from the uploaded video
            audioPath = await this.videoService.extractAudio(videoPath);

            // Transcribe audio
            const text = await this.transcriptionService.transcribeAudio(audioPath);

            // Cleanup
            this.videoService.cleanupFile(videoPath);
            this.videoService.cleanupFile(audioPath);

            res.json({ text });
        } catch (error: any) {
            console.error('File transcription error:', error);
            res.status(500).json({ error: error.message || 'Internal server error' });
        }
    }

    transcribeLink = async (req: Request, res: Response): Promise<void> => {
        let videoPath = '';
        let audioPath = '';
        try {
            const { url } = req.body;
            if (!url) {
                res.status(400).json({ error: 'URL is required' });
                return;
            }

            // Download video
            videoPath = await this.videoService.downloadVideo(url);

            // Extract audio
            audioPath = await this.videoService.extractAudio(videoPath);

            // Transcribe
            const text = await this.transcriptionService.transcribeAudio(audioPath);

            // Cleanup
            this.videoService.cleanupFile(videoPath);
            this.videoService.cleanupFile(audioPath);

            res.json({ text });
        } catch (error: any) {
            console.error('Link transcription error:', error);
            res.status(500).json({ error: error.message || 'Internal server error' });
        }
    }
}
