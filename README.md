# Scout

A community-driven mobile application that allows Melbourne public transport users to report and view Myki inspector locations in real-time.

## Overview

Scout features a Snapchat-like interface with three main screens:
- **Profile Screen** - User profile and settings
- **Map Screen** - Real-time map showing inspector locations
- **Report Screen** - Quick reporting interface for sighting Myki inspectors

## Tech Stack

### Frontend
- **React Native** with TypeScript
- **React Navigation** for navigation
- **Zustand** for state management
- **Mapbox** for maps and geolocation
- **Axios** for API requests

### Backend (Coming Soon)
- **FastAPI** (Python)
- **PostgreSQL** database
- **Docker** for containerization

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- Java Development Kit (JDK) 11 or higher

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/scout.git
cd scout
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Copy the example environment file and add your configuration:

```bash
cp .env.example .env
```

Add your Mapbox access token and other required credentials to `.env`.

### 4. Run the app

#### For Android:

```bash
npm run android
# or
yarn android
```

Make sure you have an Android emulator running or a device connected.

#### For iOS (macOS only):

```bash
cd ios && pod install && cd ..
npm run ios
# or
yarn ios
```

## Project Structure

```
scout/
├── src/
│   ├── screens/          # Main app screens
│   ├── components/       # Reusable components
│   ├── navigation/       # Navigation configuration
│   ├── store/           # Zustand state management
│   ├── services/        # API clients and utilities
│   ├── types/           # TypeScript type definitions
│   └── assets/          # Images, fonts, icons
├── backend/             # FastAPI backend (coming soon)
├── android/             # Android native code
├── ios/                # iOS native code
└── docs/               # Documentation
```

## Development

### Running Tests

```bash
npm test
# or
yarn test
```

### Linting

```bash
npm run lint
# or
yarn lint
```

### Type Checking

```bash
npm run type-check
# or
yarn type-check
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Documentation

- [Architecture](docs/ARCHITECTURE.md) - System architecture and design decisions
- [API Documentation](docs/API.md) - Backend API reference
- [Android Setup](android/README.md) - Detailed Android development setup

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built for the Melbourne public transport community
- Inspired by community-driven location sharing apps

## Disclaimer

This app is for informational purposes only. Users should always ensure they have a valid Myki ticket when using public transport.
