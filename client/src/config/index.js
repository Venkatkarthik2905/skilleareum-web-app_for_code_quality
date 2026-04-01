import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyClzDTRIO3Qm_3qX51rL8pEikz3COpzlbc",
  authDomain: "skilleareum.firebaseapp.com",
  projectId: "skilleareum",
  storageBucket: "skilleareum.appspot.com",
  messagingSenderId: "1086253576374",
  appId: "1:1086253576374:web:2862541b065e0080cd3617",
  measurementId: "G-DXFCQJ014E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
