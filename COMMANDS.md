# 🚀 Quick Commands Reference

## Backend Server

### Start Server
```bash
cd server
npm start
```

### Development Mode (with auto-reload)
```bash
cd server
npm run dev
```

### Stop Server
Press `Ctrl + C` in the terminal

---

## Mobile App

### Run on iOS Simulator
```bash
cd client
npx react-native run-ios
```

### Run on Android Emulator/Device
```bash
cd client
npx react-native run-android
```

### Start Metro Bundler (if needed)
```bash
cd client
npx react-native start
```

### Clear Cache & Restart
```bash
cd client
npx react-native start --reset-cache
```

---

## Troubleshooting Commands

### Backend Issues

**Reinstall dependencies:**
```bash
cd server
rm -rf node_modules package-lock.json
npm install
```

**Check if port 3000 is in use:**
```bash
lsof -ti:3000
```

**Kill process on port 3000:**
```bash
kill -9 $(lsof -ti:3000)
```

### Mobile App Issues

**iOS - Reinstall Pods:**
```bash
cd client/ios
pod deintegrate
pod install
cd ../..
```

**Android - Clean Build:**
```bash
cd client/android
./gradlew clean
cd ../..
```

**Clear React Native cache:**
```bash
cd client
rm -rf node_modules
rm -rf ios/Pods ios/Podfile.lock
rm -rf android/.gradle android/build
npm install
cd ios && pod install && cd ..
```

---

## Testing API Endpoints

### Health Check
```bash
curl http://localhost:3000/health
```

### Test Upload (with a video file)
```bash
curl -X POST http://localhost:3000/api/transcribe/upload \
  -F "video=@/path/to/your/video.mp4"
```

### Test Link Transcription
```bash
curl -X POST http://localhost:3000/api/transcribe/link \
  -H "Content-Type: application/json" \
  -d '{"url":"https://youtube.com/watch?v=VIDEO_ID"}'
```

---

## Development Tools

### Check TypeScript (Backend)
```bash
cd server
npx tsc --noEmit
```

### Check TypeScript (Frontend)
```bash
cd client
npx tsc --noEmit
```

### React Native Doctor
```bash
cd client
npx react-native doctor
```

### View Logs

**iOS Logs:**
```bash
npx react-native log-ios
```

**Android Logs:**
```bash
npx react-native log-android
```

---

## Environment Setup

### Find Your Local IP (for physical devices)

**macOS/Linux:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

**Windows:**
```bash
ipconfig
```

### Update API URL in Mobile App
Edit `client/src/services/api.ts` and change:
```typescript
const API_BASE_URL = 'http://YOUR_IP:3000/api';
```

---

## Quick Fixes

### "Cannot connect to server"
1. Ensure backend is running: `cd server && npm start`
2. Check API_BASE_URL in `client/src/services/api.ts`
3. For Android emulator, use: `http://10.0.2.2:3000/api`
4. For iOS simulator, use: `http://localhost:3000/api`

### "Metro bundler not running"
```bash
cd client
npx react-native start
```

### "Build failed"
```bash
# iOS
cd client/ios && pod install && cd ../..

# Android
cd client/android && ./gradlew clean && cd ../..
```

### "OpenAI API error"
1. Check your API key in `server/.env`
2. Verify you have credits in your OpenAI account
3. Check the API key format: `sk-...`

---

## Useful npm Scripts

### Backend (`server/package.json`)
- `npm start` - Start server with ts-node
- `npm run dev` - Start with auto-reload

### Frontend (`client/package.json`)
- `npm start` - Start Metro bundler
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm test` - Run tests
- `npm run lint` - Check code style

---

## 📝 Notes

- Backend runs on port **3000** by default
- Change port in `server/.env`: `PORT=3001`
- Always start backend before running mobile app
- For physical devices, ensure same WiFi network
