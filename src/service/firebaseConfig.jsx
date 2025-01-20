// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const api_Key = import.meta.env.VITE_FIREBASE_API_KEY;
const firebaseConfig = {
  apiKey: api_Key,
  authDomain: "trip-on-4ee78.firebaseapp.com",
  projectId: "trip-on-4ee78",
  storageBucket: "trip-on-4ee78.appspot.com",
  messagingSenderId: "138641820653",
  appId: "1:138641820653:web:c30e25b6977c0509a4f5e4",
  measurementId: "G-NQXZ8XNTDS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);