// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "react-notes-8e53f.firebaseapp.com",
  projectId: "react-notes-8e53f",
  storageBucket: "react-notes-8e53f.appspot.com",
  messagingSenderId: "448387111352",
  appId: "1:448387111352:web:7c1773b6f33740928fd74d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const notesCollection = collection(db, "notes");