// src/firebase.js - CORRECTED VERSION
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics"; // Optional: Remove if not using analytics yet

// --- ADD THESE TWO IMPORTS FOR AUTHENTICATION AND FIRESTORE ---
import { getAuth } from "firebase/auth"; // <--- ADD THIS LINE
import { getFirestore } from "firebase/firestore"; // <--- ADD THIS LINE (for database)

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};
rementId: "G-9KSGCV0J02" // Keep this if you use analytics

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // Optional: Comment out or remove if not using analytics yet

// --- INITIALIZE AUTH AND FIRESTORE SERVICES ---
const auth = getAuth(app); // <--- ADD THIS LINE (Initializes the auth service)
const db = getFirestore(app); // <--- ADD THIS LINE (Initializes the firestore service)

// --- EXPORT AUTH AND DB ---
export { auth, db }; // <--- ADD/UPDATE THIS LINE (Exports auth and db as named exports)