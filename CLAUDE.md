# Scout - AI Context Primer

This document provides comprehensive context about the Scout project for AI assistants working on the codebase.

## Project Overview

**Scout** is a community-driven mobile application for Melbourne public transport users to report and view Myki inspector locations in real-time. Think of it as a Snapchat-like interface with location sharing for public transport inspectors.

## Context Priming
Read the CLAUDE.md and other docs files to prime your understanding of the project.

### Core Purpose
- Enable users to report inspector sightings with location data
- Display real-time inspector locations on a map
- Community verification system for report credibility
- Help commuters stay informed about inspector presence

### Key Features
- Real-time map showing inspector locations (Mapbox)
- Quick reporting interface
- User profiles and authentication
- Community-driven verification (upvotes)
- Reports auto-expire after 2 hours

## Current Status

### Version Information
- **React Native**: 0.76.6 (Latest - upgraded from 0.73.2)
- **Platform**: Android (primary), iOS (ready but not tested)
- **Build Status**: Working with latest RN version
- **Package Name**: `com.scout`
- **App Name**: "Scout"

### Development Stage
- Initial setup complete
- Core frontend structure implemented
- Backend structure scaffolded (FastAPI)
- Android build configured
- **NOT YET BUILT/TESTED** - Awaiting Mapbox token configuration

### Known Issues & Blockers
1. **Mapbox Configuration Required**:
   - Public token needed in `.env`
   - Downloads token needed in `android/gradle.properties`
   - Get tokens from: https://account.mapbox.com/access-tokens/

2. **Backend Not Implemented**:
   - FastAPI structure exists but endpoints are placeholders
   - PostgreSQL database not configured
   - No actual API connection from frontend

## Tech Stack

### Frontend (React Native)
```json
{
  "react-native": "0.76.6",
  "react": "18.3.1",
  "typescript": "5.7.2",
  "@react-navigation/native": "7.0.18",
  "@react-navigation/bottom-tabs": "7.2.0",
  "zustand": "5.0.2",
  "@rnmapbox/maps": "10.1.37",
  "axios": "1.7.9",
  "react-native-reanimated": "3.16.3",
  "react-native-gesture-handler": "2.22.0",
  "react-native-safe-area-context": "4.14.0",
  "react-native-screens": "4.4.0"
}
```

### Backend (FastAPI)
- Python 3.11+
- FastAPI (async web framework)
- PostgreSQL 15+ (database)
- SQLAlchemy (ORM)
- Pydantic (validation)
- Docker & Docker Compose

### Android Build Configuration
- Gradle: 8.7
- Android Gradle Plugin: 8.6.1
- Compile SDK: 35
- Target SDK: 34
- Min SDK: 21
- Kotlin: 1.8.0
- Build Tools: 35.0.0

### Development Tools
- TypeScript for type safety
- ESLint & Prettier for code quality
- Jest for testing
- Metro bundler for development
- Android Studio for native development

## Project Structure

```
scout/
├── src/                          # React Native source code
│   ├── screens/                  # Main app screens
│   │   ├── ProfileScreen.tsx     # User profile & settings
│   │   ├── MapScreen.tsx         # Real-time map view (Mapbox)
│   │   └── ReportScreen.tsx      # Inspector reporting interface
│   ├── navigation/
│   │   └── TabNavigator.tsx      # Bottom tab navigation (3 tabs)
│   ├── store/                    # Zustand state management
│   │   ├── authStore.ts          # User auth state
│   │   ├── reportStore.ts        # Inspector reports state
│   │   └── mapStore.ts           # Map state (location, markers)
│   ├── services/                 # API clients
│   │   ├── apiClient.ts          # Axios base configuration
│   │   ├── authService.ts        # Authentication API calls
│   │   └── reportService.ts      # Report API calls
│   ├── types/
│   │   └── env.d.ts              # Environment variable types
│   └── App.tsx                   # Root component
│
├── android/                      # Android native code
│   ├── app/
│   │   ├── src/main/java/com/scout/
│   │   │   ├── MainActivity.kt
│   │   │   └── MainApplication.kt
│   │   ├── build.gradle          # App-level build config
│   │   └── src/main/AndroidManifest.xml
│   ├── build.gradle              # Project-level build config
│   ├── settings.gradle
│   └── gradle.properties         # MAPBOX_DOWNLOADS_TOKEN goes here
│
├── ios/                          # iOS native code (not yet configured)
│
├── backend/                      # FastAPI backend
│   ├── app/
│   │   ├── main.py              # FastAPI entry point
│   │   ├── routes/              # API endpoints (auth, users, reports)
│   │   ├── models/              # SQLAlchemy database models
│   │   ├── schemas/             # Pydantic validation schemas
│   │   └── database/            # Database configuration
│   ├── Dockerfile
│   ├── docker-compose.yml       # Backend + PostgreSQL
│   └── requirements.txt
│
├── docs/                        # Documentation
│   ├── ARCHITECTURE.md          # System architecture & design decisions
│   └── API.md                   # Complete API documentation
│
├── .env                         # Environment variables (GITIGNORED)
├── .env.example                 # Template for environment variables
├── package.json                 # NPM dependencies
├── tsconfig.json                # TypeScript configuration
├── babel.config.js              # Babel configuration
└── metro.config.js              # Metro bundler config
```

## Key Configuration Files

### Environment Variables (`.env`)
```bash
API_BASE_URL=http://localhost:8000/api/v1
MAPBOX_ACCESS_TOKEN=pk.your_public_token_here
```

**IMPORTANT**:
- `.env` is gitignored for security
- Use `.env.example` as template
- Never commit real tokens to git

### Android Gradle Properties (`android/gradle.properties`)
```properties
MAPBOX_DOWNLOADS_TOKEN=sk.your_secret_downloads_token_here
```

**CRITICAL**:
- Mapbox requires secret token for downloading SDK
- This is different from public access token
- Must be a downloads token (starts with `sk.`)

### API Client Configuration (`src/services/apiClient.ts`)
- Base URL from environment variable
- Axios instance configured
- Currently points to localhost:8000 (backend not running)

## Development Workflow

### First-Time Setup
```bash
# 1. Clone and install
git clone <repo>
cd scout
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your Mapbox public token

# 3. Configure Android Gradle
# Edit android/gradle.properties
# Add: MAPBOX_DOWNLOADS_TOKEN=sk.your_token

# 4. Fix macOS file watchers (if on Mac)
ulimit -n 4096

# 5. Run on Android
npm start                    # Terminal 1: Metro bundler
npm run android             # Terminal 2: Build & run
```

### Common Commands
```bash
# Development
npm start                   # Start Metro bundler
npm run android            # Build & run on Android
npm run ios                # Build & run on iOS (macOS only)

# Code Quality
npm run lint               # Run ESLint
npm run lint:fix           # Auto-fix linting issues
npm run type-check         # TypeScript type checking
npm run format             # Prettier formatting
npm test                   # Run Jest tests

# Android Specific
cd android && ./gradlew clean              # Clean build
cd android && ./gradlew assembleDebug      # Build debug APK
npx react-native run-android --device      # Run on physical device

# Debugging
npx react-native start --reset-cache       # Clear Metro cache
adb devices                                # List connected devices
adb logcat                                 # View Android logs
adb reverse tcp:8000 tcp:8000             # Port forwarding for API
```

### Backend Commands
```bash
# Docker (recommended)
cd backend
docker-compose up          # Start backend + PostgreSQL

# Manual (if not using Docker)
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# Access API docs
http://localhost:8000/docs          # Swagger UI
http://localhost:8000/redoc         # ReDoc
```

## Architecture & Design Decisions

### State Management (Zustand)
**Why Zustand over Redux/MobX?**
- Lightweight (minimal boilerplate)
- Simple API
- TypeScript-friendly
- No provider wrapper needed
- Sufficient for app complexity

**Store Structure:**
- `authStore` - User authentication, tokens, profile
- `reportStore` - Inspector reports, submission, history
- `mapStore` - Current location, visible markers, map region

### Navigation (React Navigation)
**Tab-Based Navigation:**
```
TabNavigator (Bottom Tabs)
├── Profile (Left)
├── Map (Center - Default)
└── Report (Right)
```

**Snapchat-like UX:**
- Map screen is default/home
- Swipe left for Profile
- Swipe right for Report
- Bottom tab bar for direct access

### API Design (RESTful)
**Base URL:** `/api/v1/`

**Endpoints:**
- `POST /auth/register` - User registration
- `POST /auth/login` - Authentication
- `POST /auth/refresh` - Token refresh
- `GET /users/me` - Current user profile
- `GET /reports` - Get reports (with geo filters)
- `POST /reports` - Submit new report
- `PUT /reports/{id}/verify` - Verify/upvote report
- `DELETE /reports/{id}` - Delete own report

**Authentication:**
- JWT-based
- Access token: 15 min expiry
- Refresh token: 30 days
- Bearer token in Authorization header

### Database Schema

**Users:**
- id (UUID)
- username (unique)
- email (unique)
- password_hash
- created_at, updated_at

**Reports:**
- id (UUID)
- user_id (FK)
- latitude, longitude (location)
- location_name (e.g., "Flinders St Station")
- transport_line (e.g., "Cranbourne/Pakenham")
- description (optional)
- verification_count (upvotes)
- is_active (auto-expire after 2 hours)
- created_at, expires_at

**Report Verifications:**
- id (UUID)
- report_id (FK)
- user_id (FK)
- created_at

### Key Design Choices

1. **Report Expiration (2 hours)**
   - Inspector locations are time-sensitive
   - Keeps map clean and relevant
   - Reduces database storage

2. **Community Verification**
   - Upvote system for trust
   - Prevents spam
   - One-tap interaction

3. **Anonymous Reporting**
   - Users authenticated but not publicly linked
   - Encourages participation
   - Privacy-conscious

4. **Location Privacy**
   - Coordinates rounded to ~100m accuracy
   - Sufficient for purpose
   - Reduces tracking concerns

5. **Polling over WebSockets (MVP)**
   - Simpler implementation
   - Adequate for use case
   - Can upgrade later

## Common Pitfalls & Solutions

### Mapbox Configuration
**Problem:** Build fails with "Could not find com.mapbox.maps:android"
**Solution:**
1. Add downloads token to `android/gradle.properties`
2. Ensure Mapbox Maven repo is in `android/build.gradle`
3. Clean and rebuild: `cd android && ./gradlew clean`

### File Watcher Limits (macOS)
**Problem:** "EMFILE: too many open files"
**Solution:**
```bash
ulimit -n 4096
# Make permanent: echo "ulimit -n 4096" >> ~/.zshrc
```

### Metro Bundler Port Conflicts
**Problem:** Port 8081 already in use
**Solution:**
```bash
npx react-native start --port 8082
# Update app to use new port
```

### Android Package Name Issues
**Problem:** App name still shows "ScoutTemp" or wrong package
**Solution:** All instances updated to `com.scout`, but verify:
- `android/app/build.gradle` - applicationId
- `MainActivity.kt` - package name
- `MainApplication.kt` - package name
- `AndroidManifest.xml` - package attribute
- `strings.xml` - app_name

### ADB Device Not Found
**Problem:** `adb devices` shows no devices
**Solution:**
1. Enable USB debugging on device
2. For emulator: Start from Android Studio Device Manager
3. Check: `adb kill-server && adb start-server`

## Security Considerations

### Token Management
- Environment variables are gitignored
- Never commit `.env` or `gradle.properties` with real tokens
- Use different tokens for development/production
- Rotate tokens regularly

### API Security (To Implement)
- Rate limiting on all endpoints
- Input validation via Pydantic
- SQL injection protection via ORM
- CORS configuration
- Password hashing with bcrypt

### Privacy
- Minimal personal data collection
- Location data anonymization
- GDPR considerations
- User data deletion on request

## Testing Strategy

### Unit Tests
- Test Zustand stores
- Test utility functions
- Test API service methods

### Integration Tests
- Test navigation flows
- Test API integration
- Test state updates

### E2E Tests (Future)
- Test complete user journeys
- Test on real devices
- Test offline scenarios

## Future Enhancements

1. **Push Notifications** - Alert nearby inspectors
2. **WebSocket Integration** - Real-time updates
3. **Social Features** - Friends, activity feed
4. **Route Planning** - PT route integration
5. **Offline Mode** - Cache reports
6. **Photo Uploads** - Visual proof
7. **Gamification** - Points, badges, leaderboards
8. **Analytics Dashboard** - User insights

## Quick Reference

### Important File Locations
- Main app entry: `src/App.tsx`
- Navigation: `src/navigation/TabNavigator.tsx`
- API base config: `src/services/apiClient.ts`
- Environment types: `src/types/env.d.ts`
- Android manifest: `android/app/src/main/AndroidManifest.xml`
- Gradle config: `android/app/build.gradle`

### Package Naming
- **Android Package**: `com.scout`
- **App Display Name**: "Scout"
- **NPM Package**: `scout`

### Port Numbers
- Metro Bundler: 8081 (default)
- Backend API: 8000
- PostgreSQL: 5432

### Git Configuration
Files gitignored for security:
- `.env`
- `android/gradle.properties` (contains Mapbox token)
- `android/local.properties`
- `ios/Pods/`

### Useful Docs
- Architecture: `docs/ARCHITECTURE.md`
- API Reference: `docs/API.md`
- Android Setup: `android/README.md`
- Backend Setup: `backend/README.md`
- Contributing: `CONTRIBUTING.md`

## AI Assistant Guidelines

When working on this project:

1. **Always check environment configuration first** - Many issues stem from missing Mapbox tokens

2. **Respect the architecture** - Use Zustand for state, React Navigation for routing, don't introduce new patterns without discussion

3. **Type safety matters** - Always use TypeScript, define proper types, avoid `any`

4. **Follow existing code style** - ESLint and Prettier configs are already set up

5. **Security first** - Never commit tokens, always use environment variables

6. **Mobile-first thinking** - Consider offline scenarios, performance, battery usage

7. **Test on Android primarily** - iOS is ready but not the main platform yet

8. **Backend is placeholder** - Don't expect API calls to work until backend is implemented

9. **Documentation is important** - Update relevant docs when making significant changes

10. **Community-driven focus** - Features should serve the Melbourne PT community use case

## Current Limitations

- Backend API not implemented (endpoints are stubs)
- No real authentication yet
- No database connection
- No actual Mapbox integration (awaiting token)
- iOS not tested
- No CI/CD pipeline
- No production deployment configuration
- No analytics/monitoring

## Next Steps for Development

1. **Immediate:**
   - Add Mapbox tokens to configuration
   - Test first build on Android emulator
   - Verify all three screens render correctly

2. **Short-term:**
   - Implement Mapbox map in MapScreen
   - Build reporting UI in ReportScreen
   - Create profile UI in ProfileScreen
   - Add location services

3. **Medium-term:**
   - Implement FastAPI backend endpoints
   - Set up PostgreSQL database
   - Connect frontend to real API
   - Implement authentication flow

4. **Long-term:**
   - Deploy backend to cloud
   - Publish to Google Play Store
   - Add push notifications
   - Implement social features

---

**Last Updated:** December 2024
**Project Status:** Initial Setup Complete, Awaiting First Build
**Primary Contact:** Ben McShanag (benmcshanag)
