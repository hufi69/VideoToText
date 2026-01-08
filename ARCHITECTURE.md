# 📱 App Flow & Architecture

## User Flow

```
┌─────────────────────────────────────────────────────────────┐
│                        HOME SCREEN                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              🎬 Video to Text                         │  │
│  │        Convert any video into text instantly          │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  🎬 Upload from Gallery                               │  │
│  │  Select a video from your device                      │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │         [Choose Video Button]                   │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│                         OR                                  │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  🔗 Paste Video Link                                  │  │
│  │  Enter a YouTube or video URL                         │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │  [https://youtube.com/watch?v=...]             │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │         [Transcribe Link Button]                │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
                      [Processing...]
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      RESULT SCREEN                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  ← Back                                               │  │
│  │  Transcription Result                                 │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                      ✨                                │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │  This is the transcribed text from your video.  │  │  │
│  │  │  It will appear here after processing...        │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │                                                       │  │
│  │  ┌──────────────┐  ┌──────────────┐                 │  │
│  │  │  📋 Copy     │  │  📤 Share    │                 │  │
│  │  └──────────────┘  └──────────────┘                 │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Backend API Flow

```
Mobile App                Backend Server              OpenAI
    │                          │                        │
    │──── Upload Video ───────▶│                        │
    │    (multipart/form)      │                        │
    │                          │                        │
    │                          │── Extract Audio ──────▶│
    │                          │   (FFmpeg)             │
    │                          │                        │
    │                          │◀─── Audio File ────────│
    │                          │                        │
    │                          │── Transcribe ─────────▶│
    │                          │   (Whisper API)        │
    │                          │                        │
    │                          │◀─── Text Result ───────│
    │                          │                        │
    │◀─── JSON Response ───────│                        │
    │    { text: "..." }       │                        │
    │                          │                        │
    │                          │── Cleanup Files ──────▶│
    │                          │                        │
```

## Component Architecture

```
App.tsx
├── NavigationContainer
    └── Stack.Navigator
        ├── HomeScreen
        │   ├── LinearGradient (Background)
        │   ├── Header (Title + Subtitle)
        │   ├── Upload Card
        │   │   ├── Icon
        │   │   ├── Title + Description
        │   │   └── GradientButton
        │   ├── Divider (OR)
        │   └── Link Card
        │       ├── Icon
        │       ├── Title + Description
        │       ├── InputField
        │       └── GradientButton
        │
        └── ResultScreen
            ├── LinearGradient (Background)
            ├── Header (Back Button + Title)
            └── Card
                ├── Icon
                ├── Text Container
                │   └── Transcribed Text
                └── Actions
                    ├── Copy Button (Gradient)
                    └── Share Button (Gradient)
```

## File Organization

```
src/
├── screens/              # Full-page components
│   ├── HomeScreen.tsx    # Main input screen
│   └── ResultScreen.tsx  # Results display
│
├── components/           # Reusable UI components
│   ├── GradientButton.tsx
│   └── InputField.tsx
│
├── services/            # Business logic & API
│   └── api.ts           # Backend communication
│
├── theme/               # Design system
│   └── index.ts         # Colors, spacing, typography
│
└── types/               # TypeScript definitions
    └── index.ts         # Shared types
```

## Data Flow

```
1. User Action
   ↓
2. Screen Component (HomeScreen)
   ↓
3. API Service (apiService.transcribeFile/Link)
   ↓
4. Backend Controller (TranscribeController)
   ↓
5. Video Service (download/extract audio)
   ↓
6. Transcription Service (OpenAI Whisper)
   ↓
7. Response back through chain
   ↓
8. Navigate to ResultScreen
   ↓
9. Display + Copy/Share options
```

## Key Design Patterns

### Backend
- **Layered Architecture**: Controller → Service → Utils
- **Dependency Injection**: Services instantiated in controllers
- **Error Handling**: Try-catch with proper error responses
- **Resource Cleanup**: Automatic file deletion after processing

### Frontend
- **Component Composition**: Small, reusable components
- **Separation of Concerns**: UI, logic, and data separated
- **Type Safety**: TypeScript throughout
- **Theme System**: Centralized design tokens
- **Navigation**: Stack-based navigation pattern

## Technology Choices

### Why React Native CLI (not Expo)?
- Full native module access
- Better for production apps
- More control over native code
- Easier to integrate custom modules

### Why OpenAI Whisper?
- Industry-leading accuracy
- Supports multiple languages
- Fast processing
- Reliable API

### Why TypeScript?
- Type safety
- Better IDE support
- Fewer runtime errors
- Scalable codebase

### Why Linear Gradients?
- Modern, premium look
- Visual hierarchy
- Brand differentiation
- Enhanced user engagement
