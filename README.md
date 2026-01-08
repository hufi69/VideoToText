# Video to Text Converter

A professional React Native mobile application that converts videos to text using speech-to-text technology.

## Features

- 📱 **Upload from Gallery**: Select videos from your device
- 🔗 **Paste Video Link**: Enter YouTube or video URLs
- ✨ **AI Transcription**: Powered by OpenAI Whisper API
- 📋 **Copy & Share**: Easy text management
- 🎨 **Premium UI**: Modern gradient design with smooth animations

## Project Structure

```
Video/
├── client/                 # React Native Mobile App
│   ├── src/
│   │   ├── screens/       # Screen components
│   │   ├── components/    # Reusable UI components
│   │   ├── services/      # API integration
│   │   ├── theme/         # Design tokens
│   │   └── types/         # TypeScript types
│   └── App.tsx            # Main app entry
│
└── server/                # Node.js Backend
    ├── src/
    │   ├── controllers/   # Request handlers
    │   ├── routes/        # API routes
    │   ├── services/      # Business logic
    │   └── utils/         # Helper functions
    └── .env               # Environment variables
```

## Setup Instructions

### Backend (Node.js)

1. Navigate to server directory:
   ```bash
   cd server
   ```

2. Install dependencies (already done):
   ```bash
   npm install
   ```

3. Configure environment variables in `.env`:
   ```
   PORT=3000
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Mobile App (React Native)

1. Navigate to client directory:
   ```bash
   cd client
   ```

2. Install dependencies (already done):
   ```bash
   npm install
   ```

3. Install iOS dependencies:
   ```bash
   cd ios && pod install && cd ..
   ```

4. Run on iOS:
   ```bash
   npx react-native run-ios
   ```

5. Run on Android:
   ```bash
   npx react-native run-android
   ```

## API Endpoints

### POST `/api/transcribe/upload`
Upload a video file for transcription.

**Request**: `multipart/form-data` with `video` field

**Response**:
```json
{
  "text": "Transcribed text content..."
}
```

### POST `/api/transcribe/link`
Transcribe a video from a URL.

**Request**:
```json
{
  "url": "https://youtube.com/watch?v=..."
}
```

**Response**:
```json
{
  "text": "Transcribed text content..."
}
```

## Technologies Used

### Backend
- **Node.js** + **TypeScript**: Runtime and language
- **Express**: Web framework
- **Multer**: File upload handling
- **FFmpeg**: Audio extraction
- **OpenAI Whisper**: Speech-to-text
- **ytdl-core**: Video downloading

### Mobile App
- **React Native**: Cross-platform mobile framework
- **TypeScript**: Type safety
- **React Navigation**: Screen navigation
- **Axios**: HTTP client
- **react-native-document-picker**: File selection
- **react-native-linear-gradient**: Gradient UI

## Configuration

### Update Backend URL
In `client/src/services/api.ts`, update the `API_BASE_URL`:
```typescript
const API_BASE_URL = 'http://YOUR_IP:3000/api';
```

For iOS Simulator: `http://localhost:3000/api`
For Android Emulator: `http://10.0.2.2:3000/api`
For Physical Device: `http://YOUR_LOCAL_IP:3000/api`

## Notes

- Ensure you have an OpenAI API key for transcription
- The backend must be running before using the mobile app
- For physical devices, ensure both the device and server are on the same network
# VideoToText
