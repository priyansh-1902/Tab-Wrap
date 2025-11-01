# Tab Wrap 2.0 Chrome Extension

Tab Wrap 2.0 is a Chrome extension that helps you analyze your browsing habits, categorize your activity, and visualize your time spent online. It uses local storage and on-device AI to provide privacy-friendly insights.

## Features
- Tracks your browsing history and time spent on each tab
- Categorizes your activity using customizable categories
- Visualizes your top categories, streaks, and websites
- Summarizes your browsing with a "Tab Wrap" report
- Privacy-first: all data stays on your device

## Installation
1. **Build the extension** (if not already built):
   ```sh
   npm install
   npm run build
   ```
   This will generate a `dist` folder containing the extension files.

2. **Load the extension in Chrome:**
   - Open Chrome and go to `chrome://extensions`
   - Enable "Developer mode" (toggle in the top right)
   - Click "Load unpacked"
   - Select the `dist` folder from this repository

## Getting Started
1. **Set up your profile:**
   - On the options page, add a description of yourself in the provided textarea (e.g., your interests, profession, etc.).
   - Click **Save Profile**. This enables browsing history tracking and categorization.

2. **Browse as usual:**
   - Spend a few minutes (preferrably 5 or more) browsing different websites. The extension will track your activity and categorize it in the background.

3. **Generate your Tab Wrap:**
   - Return to the options page after at least 5 minutes of browsing.
   - Click the **Tab Wrap** button.
   - After processing, click **Take me to my Tab Wrap** to view your personalized browsing summary, top categories, streaks, and more.

## Notes
- History tracking is paused until you save your profile with a description.
- You can clear your history or profile at any time from the options page.
- All data is stored locally and never leaves your device.

## Development
- Source code is in the `src` and `public` folders.
- Main React components: `options.jsx`, `CategoryPage.jsx`, `tabwrapstats.jsx`, `work.jsx`.
- Background logic: `public/background.js`.
- Build with Vite and Tailwind CSS.