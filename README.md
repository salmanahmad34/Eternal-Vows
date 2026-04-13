# 💍 Eternal - Digital Wedding Invitation SaaS

Create beautiful, customizable digital wedding invitations with live countdown timers and share them instantly with your guests worldwide.

## ✨ Features

- **Beautiful Landing Page** - Premium design with animations, features showcase, and FAQ section
- **Easy Form Creation** - Simple form to capture all wedding details
- **Instant Card Generation** - Creates a stunning invitation card immediately after form submission
- **Live Countdown Timer** - Real-time countdown showing days, hours, minutes, and seconds
- **Unique Shareable Links** - Each invitation gets a unique URL for easy sharing
- **Mobile Responsive** - Perfect viewing experience on all devices
- **Glassmorphism Design** - Modern, elegant UI with premium aesthetics
- **Firebase Integration** - Secure cloud storage using Firestore

## 📁 File Structure

```
/workspace
├── index.html      # Landing page with form (Creator Page)
├── invite.html     # Guest invitation page with countdown
├── style.css       # Premium responsive styles
├── app.js          # Firebase & application logic
└── README.md       # This file
```

## 🚀 Setup Instructions

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" and follow the setup wizard
3. Enable Firestore Database:
   - Go to **Build** → **Firestore Database**
   - Click **Create Database**
   - Start in **Test Mode** (for development)

### 2. Get Your Firebase Credentials

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps" section
3. Click the web icon (</>) to add a web app
4. Register your app with a nickname
5. Copy the `firebaseConfig` object

### 3. Configure the Application

Open `app.js` and replace the placeholder configuration (lines 22-29):

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};
```

### 4. Deploy the Application

You can deploy using any static hosting service:

#### Option A: Firebase Hosting (Recommended)
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

#### Option B: Netlify
1. Drag and drop the folder to [Netlify Drop](https://app.netlify.com/drop)
2. Or connect your GitHub repository

#### Option C: Vercel
```bash
npm install -g vercel
vercel
```

#### Option D: Local Testing
Simply open `index.html` in your browser (use a local server for best results):
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

## 🎨 Customization

### Colors
Edit CSS variables in `style.css` (lines 11-30):
```css
:root {
    --gold-primary: #d4af37;
    --rose-pink: #e8a5a5;
    --off-white: #faf8f5;
    /* ... more colors */
}
```

### Fonts
The app uses Google Fonts:
- **Playfair Display** - Headings
- **Poppins** - Body text

Modify in HTML `<head>` section or CSS variables.

## 📱 How It Works

1. **User visits landing page** - Sees beautiful homepage with features and FAQ
2. **Fills wedding form** - Enters bride/groom names, date, venue, message
3. **Submits form** - Data saved to Firestore, unique ID generated
4. **Receives shareable link** - Link displayed: `yoursite.com/invite.html?id=[DOC_ID]`
5. **Guests click link** - Invitation card loads with their details
6. **Countdown runs** - Live timer shows time until wedding
7. **Wedding day arrives** - "Happy Wedding Day!" message displays

## 🔧 Technical Details

### Tech Stack
- **HTML5** - Semantic markup
- **CSS3** - Advanced styling with animations
- **Vanilla JavaScript** - No frameworks needed
- **Firebase Firestore v9+** - Modular SDK syntax

### Firestore Schema
```
invitations (collection)
└── [DOCUMENT_ID] (document)
    ├── brideName: string
    ├── groomName: string
    ├── weddingDateTime: string (ISO format)
    ├── marriageType: string
    ├── venue: string
    ├── welcomeMessage: string
    └── createdAt: string (ISO timestamp)
```

### Security Rules
For production, update Firestore rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /invitations/{invitationId} {
      allow read: if true;  // Anyone can view invitations
      allow write: if request.time < timestamp.date(2025, 12, 31);  // Temp rule
    }
  }
}
```

## 🎯 Key Features Explained

### Form Validation
- All required fields must be filled
- Real-time validation feedback
- Loading state during submission

### Link Generation
- Uses Firestore auto-generated document ID
- Format: `yoursite.com/invite.html?id=[AUTO_ID]`
- One-click copy to clipboard

### Countdown Timer
- Updates every second
- Shows: Days, Hours, Minutes, Seconds
- Displays celebration message when wedding day arrives
- Handles past dates gracefully

### Responsive Design
- Mobile-first approach
- Breakpoints: 768px, 480px
- Touch-friendly buttons and inputs
- Optimized for all screen sizes

## 🐛 Troubleshooting

### "Failed to create invitation" error
- Check Firebase credentials in `app.js`
- Ensure Firestore is enabled in Firebase Console
- Verify internet connection

### Invitation not loading
- Check the document ID in URL
- Verify Firestore security rules allow reads
- Check browser console for errors

### Styles not applying
- Ensure `style.css` is in the same directory
- Check for CORS issues if running locally
- Clear browser cache

## 📄 License

This project is open source and available for personal and commercial use.

## 💝 Support

For questions or issues:
- Check the code comments for detailed explanations
- Review Firebase documentation: https://firebase.google.com/docs
- Inspect browser console for error messages

---

**Made with 💕 by Eternal Team**

*Creating beautiful memories, one invitation at a time.*
