// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLuO82rReZm3PjcCGj4bWn0x2nVVyeYtw",
  authDomain: "digitaldeta-e3780.firebaseapp.com",
  projectId: "digitaldeta-e3780",
  storageBucket: "digitaldeta-e3780.firebasestorage.app",
  messagingSenderId: "833276227603",
  appId: "1:833276227603:web:7a72f2bdae31319e6ecfe6",
  measurementId: "G-J8C9ECK50W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Authentication & Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Export for use across app
export { auth, db, analytics };
