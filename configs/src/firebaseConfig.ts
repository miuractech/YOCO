// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import {
    connectFunctionsEmulator,
    getFunctions,
  } from 'firebase/functions';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3vsgOFXcTOaS5jpCjDI5TmKuNtEUPFRc",
  authDomain: "yoco-866e3.firebaseapp.com",
  projectId: "yoco-866e3",
  storageBucket: "yoco-866e3.appspot.com",
  messagingSenderId: "858905951106",
  appId: "1:858905951106:web:2620dbbf83f526b858ed9b",
  measurementId: "G-VE3XTN5GEY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
const functions = getFunctions(app, 'asia-south1');
connectFunctionsEmulator(functions, 'localhost', 5001);

export { functions };
