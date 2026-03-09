import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBSC2lMNUvvkFgqnkBME5qNKmXVjpDOABM",
  authDomain: "nutritrack-1e65d.firebaseapp.com",
  projectId: "nutritrack-1e65d",
  storageBucket: "nutritrack-1e65d.firebasestorage.app",
  messagingSenderId: "347146841035",
  appId: "1:347146841035:web:bf2b69ba8198258da4244e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;