// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAb1ZA5PojTmjZV4WTBLANb_yDKyO2UQo",
  authDomain: "taskbuddy-242f4.firebaseapp.com",
  projectId: "taskbuddy-242f4",
  storageBucket: "taskbuddy-242f4.firebasestorage.app",
  messagingSenderId: "105001147445",
  appId: "1:105001147445:web:b663c995ea4f06ce59a57c",
  measurementId: "G-2YNW1P7SQR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
