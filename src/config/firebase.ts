import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVIY7zq53TwD_GdNZqJvIKQr-yLsfSCjw",
  authDomain: "daylo-app-89843.firebaseapp.com",
  projectId: "daylo-app-89843",
  storageBucket: "daylo-app-89843.firebasestorage.app",
  messagingSenderId: "289095124470",
  appId: "1:289095124470:web:a6c73903a36d0dfb8ff3d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
