import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import ytdl from '@distube/ytdl-core';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

if (ffmpegPath) {
    ffmpeg.setFfmpegPath(ffmpegPath);
}

export class VideoService {
    private tempDir = path.join(__dirname, '../../temp');

    constructor() {
        if (!fs.existsSync(this.tempDir)) {
            fs.mkdirSync(this.tempDir, { recursive: true });
        }
    }

    isValidYoutubeUrl(url: string): boolean {
        return ytdl.validateURL(url);
    }

    async downloadVideo(url: string): Promise<string> {
        if (!this.isValidYoutubeUrl(url)) {
            throw new Error('Invalid YouTube URL');
        }

        const videoId = uuidv4();
        const outputPath = path.join(this.tempDir, `${videoId}.mp4`);
        const stream = ytdl(url, { quality: 'lowest' }); // We only need audio, so lowest video quality is fine

        return new Promise((resolve, reject) => {
            stream.pipe(fs.createWriteStream(outputPath))
                .on('finish', () => resolve(outputPath))
                .on('error', reject);
        });
    }

    async extractAudio(videoPath: string): Promise<string> {
        const audioId = uuidv4();
        const outputPath = path.join(this.tempDir, `${audioId}.mp3`);

        return new Promise((resolve, reject) => {
            ffmpeg(videoPath)
                .toFormat('mp3')
                .on('end', () => resolve(outputPath))
                .on('error', (err) => reject(err))
                .save(outputPath);
        });
    }

    async cleanupFile(filePath: string) {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
}
