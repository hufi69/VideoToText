# Quick Start Guide

## 🚀 Getting Started

### Step 1: Configure OpenAI API Key

1. Open `server/.env`
2. Replace `your_openai_api_key_here` with your actual OpenAI API key:
   ```
   OPENAI_API_KEY=sk-...
   ```

### Step 2: Start the Backend

```bash
cd server
npm start
```

You should see: `Server is running on port 3000`

### Step 3: Configure Mobile App API URL

1. Open `client/src/services/api.ts`
2. Update `API_BASE_URL` based on your setup:
   - **iOS Simulator**: `http://localhost:3000/api`
   - **Android Emulator**: `http://10.0.2.2:3000/api`
   - **Physical Device**: `http://YOUR_LOCAL_IP:3000/api`

### Step 4: Run the Mobile App

**For iOS:**
```bash
cd client
npx react-native run-ios
```

**For Android:**
```bash
cd client
npx react-native run-android
```

## 📱 How to Use

1. **Upload Video**: Tap "Choose Video" to select from gallery
2. **Paste Link**: Enter a YouTube URL and tap "Transcribe Link"
3. **View Results**: See transcribed text, copy or share it

## 🔧 Troubleshooting

### Backend Issues
- **Port already in use**: Change `PORT` in `.env`
- **OpenAI errors**: Verify your API key is correct

### Mobile App Issues
- **Cannot connect to server**: 
  - Ensure backend is running
  - Check API_BASE_URL is correct
  - For physical devices, ensure same WiFi network
  
- **Android permissions**: Grant storage permissions in Settings

### iOS Specific
- If build fails, try: `cd ios && pod install && cd ..`

### Android Specific
- If build fails, try: `cd android && ./gradlew clean && cd ..`

## 📝 Next Steps

- [ ] Add your OpenAI API key to `server/.env`
- [ ] Start the backend server
- [ ] Update the API URL in the mobile app
- [ ] Run the app on your device/emulator
- [ ] Test with a short video first

## 🎨 Features

✅ Professional folder structure
✅ TypeScript throughout
✅ Premium UI with gradients
✅ Error handling
✅ File cleanup
✅ Copy & Share functionality
✅ Loading states
✅ Responsive design
