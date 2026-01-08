import { Router } from 'express';
import { TranscribeController } from '../controllers/transcribe.controller';
import multer from 'multer';

const router = Router();
const upload = multer({ dest: 'uploads/' });
const controller = new TranscribeController();

router.post('/transcribe/upload', upload.single('video'), controller.transcribeFile);
router.post('/transcribe/link', controller.transcribeLink);

export default router;
