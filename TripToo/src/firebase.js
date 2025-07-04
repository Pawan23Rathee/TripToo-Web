// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvITUxnctEW_CKTkzRXP-zYakNzrofBrc",
  authDomain: "triptoo-2e4b6.firebaseapp.com",
  projectId: "triptoo-2e4b6",
  storageBucket: "triptoo-2e4b6.firebasestorage.app",
  messagingSenderId: "289687872214",
  appId: "1:289687872214:web:3971cb5582a7f25ad29f77",
  measurementId: "G-9KSGCV0J02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



