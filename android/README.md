# Android Development Setup for Scout

This guide will help you set up your development environment for building and testing the Scout app on Android.

## Prerequisites

1. **Node.js and npm**
   - Install Node.js v18 or higher
   - npm comes bundled with Node.js

2. **Java Development Kit (JDK)**
   - Install JDK 11 or higher
   - Set `JAVA_HOME` environment variable

3. **Android Studio**
   - Download from: https://developer.android.com/studio
   - Install the latest stable version

## Android Studio Setup

### 1. Install Android Studio

Download and install Android Studio from the official website.

### 2. Install Android SDK

During Android Studio installation, make sure to install:
- Android SDK
- Android SDK Platform
- Android Virtual Device (AVD)

Or install manually via Android Studio:
1. Open Android Studio
2. Go to **Settings** → **Appearance & Behavior** → **System Settings** → **Android SDK**
3. Install:
   - Android SDK Platform 33 (or latest)
   - Android SDK Build-Tools
   - Android Emulator
   - Android SDK Platform-Tools

### 3. Configure Environment Variables

Add the following to your shell configuration file (`.bashrc`, `.zshrc`, etc.):

#### macOS/Linux:
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
```

#### Windows:
```
ANDROID_HOME=C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk
Path=%Path%;%ANDROID_HOME%\platform-tools
Path=%Path%;%ANDROID_HOME%\emulator
Path=%Path%;%ANDROID_HOME%\tools
Path=%Path%;%ANDROID_HOME%\tools\bin
```

### 4. Verify Installation

Run in terminal:
```bash
adb version
```

You should see the Android Debug Bridge version information.

## Setting Up an Android Emulator

### Create a Virtual Device

1. Open Android Studio
2. Go to **Tools** → **Device Manager**
3. Click **Create Device**
4. Select a device (recommended: Pixel 5 or similar)
5. Select a system image (recommended: Android 13 - API Level 33)
6. Click **Finish**

### Start the Emulator

From Android Studio:
- Open Device Manager
- Click the play button next to your virtual device

From command line:
```bash
emulator -avd YOUR_AVD_NAME
```

## Running Scout on Android

### 1. Install Dependencies

From the project root:
```bash
npm install
# or
yarn install
```

### 2. Start Metro Bundler

```bash
npm start
# or
yarn start
```

### 3. Run on Emulator

In a new terminal (keep Metro running):
```bash
npm run android
# or
yarn android
```

This will:
1. Build the Android app
2. Install it on the emulator/device
3. Start the app

## Using a Physical Device

### Enable Developer Options

1. Go to **Settings** → **About Phone**
2. Tap **Build Number** 7 times
3. Go back to **Settings** → **Developer Options**
4. Enable **USB Debugging**

### Connect Device

1. Connect your Android device via USB
2. Verify connection:
   ```bash
   adb devices
   ```
3. You should see your device listed
4. Run the app:
   ```bash
   npm run android
   ```

## Troubleshooting

### Port Already in Use

If Metro bundler port (8081) is in use:
```bash
npx react-native start --port 8082
```

### Gradle Build Errors

Clear Gradle cache:
```bash
cd android
./gradlew clean
cd ..
```

### App Not Installing

Uninstall and reinstall:
```bash
adb uninstall com.scout
npm run android
```

### ADB Not Found

Make sure `ANDROID_HOME` is set correctly and restart your terminal.

### Emulator Performance

For better emulator performance:
1. Enable **Hardware Acceleration** in BIOS
2. Allocate more RAM to the AVD (4GB recommended)
3. Use x86_64 system images instead of ARM

## Building for Production

### Generate Release APK

1. Update `android/app/build.gradle` with signing config
2. Build the APK:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```
3. APK will be at: `android/app/build/outputs/apk/release/app-release.apk`

### Generate AAB (for Play Store)

```bash
cd android
./gradlew bundleRelease
```

AAB will be at: `android/app/build/outputs/bundle/release/app-release.aab`

## Useful Commands

```bash
# List connected devices
adb devices

# View logs
adb logcat

# Reverse port (for API access from emulator)
adb reverse tcp:8000 tcp:8000

# Reload app
adb shell input keyevent 82  # Opens dev menu
# Then press 'r' for reload

# Clear app data
adb shell pm clear com.scout

# Install APK
adb install path/to/app.apk
```

## Resources

- [React Native Android Setup](https://reactnative.dev/docs/environment-setup)
- [Android Developer Documentation](https://developer.android.com/docs)
- [React Native Debugging](https://reactnative.dev/docs/debugging)

## Need Help?

If you encounter issues:
1. Check the [main README](../README.md)
2. Review [CONTRIBUTING.md](../CONTRIBUTING.md)
3. Open an issue on GitHub with:
   - Error messages
   - Steps to reproduce
   - Your environment details (OS, Node version, etc.)
