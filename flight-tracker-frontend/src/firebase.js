// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "aeroscope-daed5.firebaseapp.com",
  projectId: "aeroscope-daed5",
  storageBucket: "aeroscope-daed5.firebasestorage.app",
  messagingSenderId: "1090624937474",
  appId: "1:1090624937474:web:36bb06b92f7e83d29b111b",
  measurementId: "G-FBSK9TNTLR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);