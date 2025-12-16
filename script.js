
// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    const contactBtn = document.getElementById('contactBtn');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    if(contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            // 1. Allow default smooth scroll (handled by CSS)
            
            // 2. Add the blinking class to inputs
            setTimeout(() => {
                emailInput.classList.add('blink-highlight');
                messageInput.classList.add('blink-highlight');
            }, 500); // Small delay so it starts when user arrives at section

            // 3. Remove the class after 3 seconds so it stops blinking
            setTimeout(() => {
                emailInput.classList.remove('blink-highlight');
                messageInput.classList.remove('blink-highlight');
            }, 3500); // 3000ms animation + 500ms delay
        });
    }
});
/*// 1. FIREBASE IMPORT (NOT YET SETUP)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 2. FIREBASE (NOT YET SETUP)
const firebaseConfig = {
    apiKey: "AIzaSyD-YOUR-API-KEY-HERE",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};

// 3. Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
*/
// --- FORM HANDLING ---
const contactForm = document.getElementById('projectForm');
const submitBtn = document.getElementById('submitBtn');
const originalBtnText = submitBtn.innerHTML;

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Show loading state
    submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';


    try {
        await addDoc(collection(db, "messages"), {
            name: name,
            email: email,
            message: message,
            timestamp: new Date()
        });

        alert("Message sent successfully! I will get back to you soon.");
        contactForm.reset();
        
    } catch (e) {
        console.error("Error: ", e);
        alert("Something went wrong. Please try again later.");
    } finally {
        // Restore button
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});