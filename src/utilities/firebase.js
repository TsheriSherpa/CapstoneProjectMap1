// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsj09kKozlggQn7UDRK2kSvf2iU9Gco0s",
  authDomain: "moviehub-capstone.firebaseapp.com",
  projectId: "moviehub-capstone",
  storageBucket: "moviehub-capstone.appspot.com",
  messagingSenderId: "304821772696",
  appId: "1:304821772696:web:f513fa7faf2752381a0bed",
  measurementId: "G-6M293QEMWW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)