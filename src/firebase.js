
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBRQuhNjMAAeIMXZMQfLpzECcI8_ml4-_0",
  authDomain: "lostfoundportal-7c6ba.firebaseapp.com",
  projectId: "lostfoundportal-7c6ba",
  storageBucket: "lostfoundportal-7c6ba.firebasestorage.app",
  messagingSenderId: "18060682777",
  appId: "1:18060682777:web:e237d18d03b4db477dac88",
  measurementId: "G-3T23E2D8Q5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


