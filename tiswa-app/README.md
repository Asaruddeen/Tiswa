# TISWA – React Native (Expo) app

Native version of the `frontend/` React + Vite app. Same 7 screens (Home, Members, Pay, History, Events, Expense, Balance),
same green theme, same backend: `https://tiswa.onrender.com/api` (change it in `src/lib/api.js`).

## Build the APK (no Android Studio needed)

```bash
npm install
npm install -g eas-cli
eas login            # free Expo account
eas build -p android --profile preview
```
When it finishes (~10–15 min) EAS gives a download link for the `.apk`. Install it on your phone.

## Run on your phone while developing
```bash
npm install
npx expo start       # scan the QR code with the Expo Go app
```

## Build the APK locally (needs JDK 17 + Android SDK)
```bash
npx expo prebuild --platform android
cd android && ./gradlew assembleRelease
# → android/app/build/outputs/apk/release/app-release.apk
```

## Notes
- Package name: `com.yunrah.tiswa` (change in `app.json`).
- Pull down on any screen to refresh data. The free Render server can take ~30–50 s to wake up on the first load.
- The "Pay" screen has a **Pay with UPI app** button (opens GPay/PhonePe/Paytm with your UPI ID) and a **Copy ID** button.
- Play Store upload: `eas build -p android --profile production` (builds an `.aab`).
