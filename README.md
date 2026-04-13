# 💍 Wedding Invitation SaaS

A beautiful, web-based application for creating and sharing digital wedding invitations with guests.

## 📁 Project Structure

```
/workspace/
├── index.html      # Creator page - Form to create wedding invitations
├── invite.html     # Guest page - Displays the invitation with countdown timer
├── style.css       # Shared styles for both pages
├── app.js          # Firebase integration and application logic
└── README.md       # This file
```

## 🔥 Firebase Setup Instructions

### Step 1: Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup wizard
3. Enable **Firestore Database** in test mode (or production mode with proper rules)

### Step 2: Get Your Firebase Configuration
1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps" section
3. Click the web icon (`</>`) to register a web app
4. Copy the `firebaseConfig` object

### Step 3: Update app.js
Open `app.js` and replace the placeholder configuration:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### Step 4: Firestore Security Rules (Recommended)
In Firebase Console > Firestore Database > Rules, add:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /invitations/{documentId} {
      allow read: if true;  // Anyone with the link can view
      allow write: if true; // Consider adding authentication for production
    }
  }
}
```

## 🚀 How to Use

### For Local Development
1. Install a local server (e.g., Live Server extension in VS Code)
2. Or use Python: `python -m http.server 8000`
3. Open `index.html` in your browser

### For Production Deployment
Deploy to any static hosting service:
- **Firebase Hosting** (recommended)
- Netlify
- Vercel
- GitHub Pages

#### Deploy to Firebase Hosting:
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## ✨ Features

### Creator Page (index.html)
- ✅ Elegant form to capture wedding details
- ✅ Input fields: Bride's Name, Groom's Name, Date & Time, Marriage Type, Venue, Welcome Message
- ✅ Saves data to Firestore database
- ✅ Generates unique shareable link
- ✅ One-click copy to clipboard

### Guest Invitation Page (invite.html)
- ✅ Beautiful, responsive invitation design
- ✅ Dynamically loads wedding details from Firestore
- ✅ Live countdown timer (Days, Hours, Minutes, Seconds)
- ✅ "Happy Wedding Day!" message when timer reaches zero
- ✅ Premium glassmorphism effects

### Design Features
- 🎨 Google Fonts: Playfair Display & Poppins
- 🎨 Sophisticated color palette (gold, rose, off-white)
- 🎨 Glassmorphism effects
- 🎨 Smooth hover animations
- 🎨 Mobile-responsive design
- 🎨 Decorative corner elements

## 🎯 Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Firebase Firestore (Modular v9+ SDK)
- **Fonts:** Google Fonts (Playfair Display, Poppins)
- **Icons:** Unicode emoji & CSS shapes

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔐 Security Considerations

For production use, consider:
1. Implementing Firebase Authentication
2. Adding proper Firestore security rules
3. Using environment variables for sensitive data
4. Adding rate limiting
5. Implementing invitation expiration dates

## 📄 License

This project is open source and available for personal and commercial use.

---

**Built with ❤️ for couples everywhere**