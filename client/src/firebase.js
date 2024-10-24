// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-8acd9.firebaseapp.com",
  projectId: "mern-blog-8acd9",
  storageBucket: "mern-blog-8acd9.appspot.com",
  messagingSenderId: "415411890918",
  appId: "1:415411890918:web:f42f9bdfc5d2203df0a927"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);