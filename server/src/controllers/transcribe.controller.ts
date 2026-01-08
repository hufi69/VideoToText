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
            console.log('[File] Transcription request received');
            if (!req.file) {
                console.warn('[File] No file uploaded');
                res.status(400).json({ error: 'No video file uploaded' });
                return;
            }

            const videoPath = req.file.path;
            console.log(`[File] Video uploaded to: ${videoPath}`);

            // Extract audio from the uploaded video
            console.log('[File] Extracting audio...');
            audioPath = await this.videoService.extractAudio(videoPath);
            console.log(`[File] Audio extracted to: ${audioPath}`);

            // Transcribe audio
            console.log('[File] Transcribing with Gemini...');
            const text = await this.transcriptionService.transcribeAudio(audioPath);
            console.log('[File] Transcription complete');

            // Cleanup
            this.videoService.cleanupFile(videoPath);
            this.videoService.cleanupFile(audioPath);

            res.json({ text });
        } catch (error: any) {
            console.error('[File] Error:', error);
            res.status(500).json({ error: error.message || 'Internal server error' });
        }
    }

    transcribeLink = async (req: Request, res: Response): Promise<void> => {
        let videoPath = '';
        let audioPath = '';
        try {
            const { url } = req.body;
            console.log(`[Link] Received request for URL: ${url}`);
            if (!url) {
                res.status(400).json({ error: 'URL is required' });
                return;
            }

            // Download video
            console.log('[Link] Downloading video...');
            videoPath = await this.videoService.downloadVideo(url);
            console.log(`[Link] Video downloaded to: ${videoPath}`);

            // Extract audio
            console.log('[Link] Extracting audio...');
            audioPath = await this.videoService.extractAudio(videoPath);
            console.log(`[Link] Audio extracted to: ${audioPath}`);

            // Transcribe
            console.log('[Link] Transcribing with Gemini...');
            const text = await this.transcriptionService.transcribeAudio(audioPath);
            console.log('[Link] Transcription complete');

            // Cleanup
            this.videoService.cleanupFile(videoPath);
            this.videoService.cleanupFile(audioPath);

            res.json({ text });
        } catch (error: any) {
            console.error('[Link] Error:', error);
            res.status(500).json({ error: error.message || 'Internal server error' });
        }
    }
}
