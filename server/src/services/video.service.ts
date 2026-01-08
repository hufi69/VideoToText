import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import play from 'play-dl';
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
        try {
            return play.yt_validate(url) !== false;
        } catch {
            return false;
        }
    }

    async downloadVideo(url: string): Promise<string> {
        if (!this.isValidYoutubeUrl(url)) {
            throw new Error('Invalid YouTube URL');
        }

        const videoId = uuidv4();
        const outputPath = path.join(this.tempDir, `${videoId}.mp4`);

        console.log(`[VideoService] Starting download for: ${url} using play-dl`);

        try {
            const stream = await play.stream(url);

            return new Promise((resolve, reject) => {
                const writeStream = fs.createWriteStream(outputPath);

                const timeout = setTimeout(() => {
                    stream.stream.destroy();
                    writeStream.destroy();
                    reject(new Error('Download timed out after 90 seconds'));
                }, 90000);

                stream.stream.pipe(writeStream)
                    .on('finish', () => {
                        clearTimeout(timeout);
                        console.log(`[VideoService] Download finished: ${outputPath}`);
                        resolve(outputPath);
                    })
                    .on('error', (err: Error) => {
                        clearTimeout(timeout);
                        console.error(`[VideoService] Download error:`, err);
                        reject(err);
                    });
            });
        } catch (error: any) {
            console.error(`[VideoService] Play-dl error:`, error);
            throw new Error(`Failed to start download: ${error.message}`);
        }
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
