/**
 * ============================================
 * WEDDING INVITATION SAAS - MAIN APPLICATION
 * Firebase Firestore Integration (Modular v9+)
 * ============================================
 */

// ============================================
// FIREBASE CONFIGURATION
// ============================================
// IMPORTANT: Replace the values below with your actual Firebase credentials
// Get these from: Firebase Console > Project Settings > General > Your apps > SDK setup and configuration

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { 
    getFirestore, 
    collection, 
    addDoc, 
    doc, 
    getDoc 
} from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';

// 🔥 REPLACE WITH YOUR FIREBASE CONFIGURATION 🔥
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ============================================
// PAGE DETECTION & ROUTING
// ============================================

// Determine which page we're on
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

// ============================================
// CREATOR PAGE LOGIC (index.html)
// ============================================

if (currentPage === 'index.html' || currentPage === '') {
    initializeCreatorPage();
}

// ============================================
// GUEST INVITATION PAGE LOGIC (invite.html)
// ============================================

if (currentPage === 'invite.html') {
    initializeInvitationPage();
}

// ============================================
// CREATOR PAGE FUNCTIONS
// ============================================

function initializeCreatorPage() {
    const form = document.getElementById('invitationForm');
    const successSection = document.getElementById('successSection');
    const shareableLinkInput = document.getElementById('shareableLink');
    const copyBtn = document.getElementById('copyBtn');
    const createNewBtn = document.getElementById('createNewBtn');
    const copyMessage = document.getElementById('copyMessage');
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.querySelector('.btn-loader');

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

            // Save to Firestore
            const docRef = await addDoc(collection(db, 'invitations'), formData);
            
            // Generate shareable link
            const baseUrl = window.location.origin + window.location.pathname;
            const inviteUrl = `${baseUrl.replace('index.html', 'invite.html')}?id=${docRef.id}`;

            // Display success section
            shareableLinkInput.value = inviteUrl;
            form.style.display = 'none';
            successSection.style.display = 'block';

        } catch (error) {
            console.error('Error creating invitation:', error);
            alert('Failed to create invitation. Please check your Firebase configuration and try again.\n\nError: ' + error.message);
            
            // Reset button state
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
        }
    });

    // Copy link functionality
    copyBtn.addEventListener('click', () => {
        shareableLinkInput.select();
        shareableLinkInput.setSelectionRange(0, 99999); // For mobile devices

        navigator.clipboard.writeText(shareableLinkInput.value)
            .then(() => {
                copyMessage.textContent = '✓ Link copied to clipboard!';
                setTimeout(() => {
                    copyMessage.textContent = '';
                }, 3000);
            })
            .catch(err => {
                console.error('Failed to copy:', err);
                copyMessage.textContent = '✗ Failed to copy. Please copy manually.';
            });
    });

    // Create another invitation
    createNewBtn.addEventListener('click', () => {
        form.reset();
        form.style.display = 'flex';
        successSection.style.display = 'none';
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
    });
}

// ============================================
// INVITATION PAGE FUNCTIONS
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
    
    // Set page title
    document.title = `${data.brideName} & ${data.groomName} - Wedding Invitation`;
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
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('errorState').style.display = 'none';
    document.getElementById('invitationContent').style.display = 'none';
    
    // Show requested state
    element.style.display = 'flex';
    if (element.id === 'invitationContent') {
        element.style.display = 'block';
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Format a date string into a readable format
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Validate email format (if needed for future features)
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// ERROR HANDLING & DEBUGGING
// ============================================

// Global error handler for debugging
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    
    // Only show alerts in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // Uncomment below for debugging
        // alert('An error occurred. Check console for details.');
    }
});

// Console welcome message
console.log('%c✨ Wedding Invitation SaaS ✨', 'color: #d4af37; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ using Firebase Firestore', 'color: #6b6b6b; font-size: 12px;');

// ============================================
// END OF APPLICATION
// ============================================
