// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_6YdB_prGdnWUyahEIH4ogUNtspsg4gg",
  authDomain: "mentorme-ef368.firebaseapp.com",
  projectId: "mentorme-ef368",
  storageBucket: "mentorme-ef368.appspot.com",
  messagingSenderId: "230598515985",
  appId: "1:230598515985:web:8349c7ee3b69e0684280b0",
  measurementId: "G-1D11L1P322"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);