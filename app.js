/**
 * ============================================
 * ETERNAL - WEDDING INVITATION SAAS
 * Firebase Firestore Integration (Modular v9+)
 * ============================================
 */

// ============================================
// FIREBASE CONFIGURATION
// ============================================
// 🔥 IMPORTANT: Replace with your actual Firebase credentials 🔥
// Get these from: Firebase Console > Project Settings > Your apps > SDK setup

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { 
    getFirestore, 
    collection, 
    addDoc, 
    doc, 
    getDoc 
} from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';

// 🔥 REPLACE WITH YOUR FIREBASE CONFIGURATION 🔥
// If you haven't configured Firebase yet, the app will work in DEMO MODE
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Check if Firebase is properly configured
let db = null;
let isFirebaseConfigured = false;

try {
    // Only initialize if user has replaced placeholder values
    if (firebaseConfig.apiKey !== "YOUR_API_KEY_HERE" && 
        firebaseConfig.projectId !== "YOUR_PROJECT_ID") {
        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        isFirebaseConfigured = true;
        console.log('✅ Firebase initialized successfully');
    } else {
        console.warn('⚠️ Firebase not configured - Running in DEMO MODE');
        console.warn('📝 To enable full functionality, please update firebaseConfig in app.js with your Firebase credentials');
    }
} catch (error) {
    console.error('❌ Firebase initialization error:', error);
    console.warn('⚠️ Running in DEMO MODE due to Firebase error');
}

// ============================================
// PAGE DETECTION & ROUTING
// ============================================

const currentPage = window.location.pathname.split('/').pop() || 'index.html';

if (currentPage === 'index.html' || currentPage === '') {
    initializeCreatorPage();
}

if (currentPage === 'invite.html') {
    initializeInvitationPage();
}

// ============================================
// CREATOR PAGE FUNCTIONS (index.html)
// ============================================

function initializeCreatorPage() {
    const form = document.getElementById('invitationForm');
    const successMessage = document.getElementById('successMessage');
    const generatedLinkInput = document.getElementById('generatedLink');
    const previewLink = document.getElementById('previewLink');
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.querySelector('.btn-loader');

    if (!form) return;

    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Show loading state
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline';

        try {
            // Gather form data
            const formData = {
                brideName: document.getElementById('brideName').value.trim(),
                groomName: document.getElementById('groomName').value.trim(),
                weddingDateTime: document.getElementById('weddingDateTime').value,
                marriageType: document.getElementById('marriageType').value,
                venue: document.getElementById('venue').value.trim(),
                welcomeMessage: document.getElementById('welcomeMessage').value.trim(),
                createdAt: new Date().toISOString()
            };

            // Validate required fields
            if (!formData.brideName || !formData.groomName || !formData.weddingDateTime) {
                throw new Error('Please fill in all required fields');
            }

            let docId;

            if (isFirebaseConfigured && db) {
                // Save to Firestore (REAL MODE)
                console.log('💾 Saving to Firebase Firestore...');
                const docRef = await addDoc(collection(db, 'invitations'), formData);
                docId = docRef.id;
                console.log('✅ Document saved with ID:', docId);
            } else {
                // DEMO MODE: Generate a fake ID and store in localStorage
                console.log('🎭 DEMO MODE: Using localStorage instead of Firestore');
                docId = 'demo_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                
                // Store in localStorage for demo purposes
                const demoInvitations = JSON.parse(localStorage.getItem('eternal_demo_invitations') || '{}');
                demoInvitations[docId] = formData;
                localStorage.setItem('eternal_demo_invitations', JSON.stringify(demoInvitations));
                
                console.log('✅ Demo invitation saved with ID:', docId);
            }

            // Generate shareable link
            const baseUrl = window.location.origin + window.location.pathname;
            const inviteUrl = `${baseUrl.replace('index.html', 'invite.html')}?id=${docId}`;

            // Display success section with the invitation card created message
            generatedLinkInput.value = inviteUrl;
            previewLink.href = inviteUrl;
            
            form.style.display = 'none';
            successMessage.style.display = 'block';

            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        } catch (error) {
            console.error('Error creating invitation:', error);
            alert('Failed to create invitation. Please check your Firebase configuration and try again.\n\nError: ' + error.message);
            
            // Reset button state
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
        }
    });
}

// Global function for copying link (accessible from HTML onclick)
window.copyLink = function() {
    const generatedLinkInput = document.getElementById('generatedLink');
    const copyText = document.getElementById('copyText');
    const copyIcon = document.getElementById('copyIcon');
    
    if (!generatedLinkInput) return;
    
    generatedLinkInput.select();
    generatedLinkInput.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(generatedLinkInput.value)
        .then(() => {
            copyText.textContent = 'Copied!';
            copyIcon.textContent = '✅';
            setTimeout(() => {
                copyText.textContent = 'Copy';
                copyIcon.textContent = '📋';
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy:', err);
            copyText.textContent = 'Failed';
            copyIcon.textContent = '❌';
        });
};

// Global function for creating another invitation
window.createAnother = function() {
    const form = document.getElementById('invitationForm');
    const successMessage = document.getElementById('successMessage');
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.querySelector('.btn-loader');
    
    if (!form) return;
    
    form.reset();
    form.style.display = 'flex';
    successMessage.style.display = 'none';
    btnText.style.display = 'inline';
    btnLoader.style.display = 'none';
    
    // Scroll back to form
    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

// ============================================
// INVITATION PAGE FUNCTIONS (invite.html)
// ============================================

function initializeInvitationPage() {
    const loadingState = document.getElementById('loadingState');
    const errorState = document.getElementById('errorState');
    const invitationContent = document.getElementById('invitationContent');

    // Extract ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const invitationId = urlParams.get('id');

    // Validate ID exists
    if (!invitationId) {
        showState(errorState);
        return;
    }

    // Fetch invitation data from Firestore
    fetchInvitation(invitationId)
        .then(data => {
            if (data) {
                populateInvitation(data);
                startCountdown(data.weddingDateTime);
                showState(invitationContent);
                
                // Update page title
                document.title = `${data.brideName} & ${data.groomName} - Wedding Invitation`;
            } else {
                showState(errorState);
            }
        })
        .catch(error => {
            console.error('Error fetching invitation:', error);
            showState(errorState);
        });
}

async function fetchInvitation(id) {
    try {
        // Check if this is a demo ID
        if (id.startsWith('demo_')) {
            console.log('🎭 DEMO MODE: Fetching from localStorage');
            const demoInvitations = JSON.parse(localStorage.getItem('eternal_demo_invitations') || '{}');
            if (demoInvitations[id]) {
                return demoInvitations[id];
            } else {
                console.log('No such demo document!');
                return null;
            }
        }

        // REAL MODE: Fetch from Firestore
        if (!db) {
            console.error('Firebase not initialized');
            return null;
        }

        const docRef = doc(db, 'invitations', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log('No such document!');
            return null;
        }
    } catch (error) {
        console.error('Error getting document:', error);
        throw error;
    }
}

function populateInvitation(data) {
    // Set couple names
    document.getElementById('brideNameDisplay').textContent = data.brideName;
    document.getElementById('groomNameDisplay').textContent = data.groomName;
    
    // Set marriage type
    document.getElementById('marriageTypeDisplay').textContent = `${data.marriageType} Ceremony`;
    
    // Set welcome message
    document.getElementById('welcomeMessageDisplay').textContent = data.welcomeMessage;
    
    // Set venue
    document.getElementById('venueDisplay').textContent = data.venue;
    
    // Parse and format date/time
    const weddingDate = new Date(data.weddingDateTime);
    
    // Format date (e.g., "Saturday, December 25, 2024")
    const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    document.getElementById('weddingDateDisplay').textContent = weddingDate.toLocaleDateString('en-US', dateOptions);
    
    // Format time (e.g., "4:00 PM")
    const timeOptions = { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
    };
    document.getElementById('weddingTimeDisplay').textContent = weddingDate.toLocaleTimeString('en-US', timeOptions);
}

function startCountdown(weddingDateTimeString) {
    const weddingDate = new Date(weddingDateTimeString).getTime();
    
    const daysEl = document.getElementById('daysLeft');
    const hoursEl = document.getElementById('hoursLeft');
    const minutesEl = document.getElementById('minutesLeft');
    const secondsEl = document.getElementById('secondsLeft');
    const countdownTimer = document.getElementById('countdownTimer');
    const weddingDayMessage = document.getElementById('weddingDayMessage');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        // Check if wedding day has arrived
        if (distance < 0) {
            // Wedding day or past
            countdownTimer.style.display = 'none';
            weddingDayMessage.style.display = 'block';
            return;
        }

        // Calculate time components
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update DOM with leading zeros
        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    // Initial call
    updateCountdown();

    // Update every second
    const timerInterval = setInterval(updateCountdown, 1000);

    // Store interval ID for potential cleanup (optional)
    window.countdownInterval = timerInterval;
}

function showState(element) {
    // Hide all states
    const loadingState = document.getElementById('loadingState');
    const errorState = document.getElementById('errorState');
    const invitationContent = document.getElementById('invitationContent');
    
    if (loadingState) loadingState.style.display = 'none';
    if (errorState) errorState.style.display = 'none';
    if (invitationContent) invitationContent.style.display = 'none';
    
    // Show requested state
    if (element) {
        element.style.display = 'flex';
        if (element.id === 'invitationContent') {
            element.style.display = 'block';
        }
    }
}

// ============================================
// ERROR HANDLING & DEBUGGING
// ============================================

// Global error handler for debugging
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

// Console welcome message
console.log('%c💍 Eternal - Wedding Invitation SaaS 💍', 'color: #d4af37; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ using Firebase Firestore', 'color: #6b6b6b; font-size: 12px;');

// ============================================
// END OF APPLICATION
// ============================================
