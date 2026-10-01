# TISWA download website (React + Vite + Tailwind CSS)

## 1. Add your APK
Copy the APK built with EAS into `public/` and name it **TISWA.apk**:

    public/TISWA.apk

The site then serves it at `/TISWA.apk`. The download buttons, the QR code and the file size badge all use that link.

If the file is too big for your host, upload the APK somewhere else (for example a GitHub Releases asset) and put its full URL in
`src/config.js` → `APK_URL`.

## 2. Edit the details
`src/config.js` holds the APK link, version, minimum Android version, company name and an optional support email.

## 3. Run / build
    npm install
    npm run dev       # local preview
    npm run build     # output in dist/

## 4. Deploy (Vercel)
Push this folder to GitHub and import it on Vercel (framework: Vite). `vercel.json` makes browsers download the `.apk` file
with the correct file type. On Netlify or any static host, upload the `dist/` folder.

## Updating the app later
Replace `public/TISWA.apk`, bump `APP_VERSION` in `src/config.js`, and redeploy.
