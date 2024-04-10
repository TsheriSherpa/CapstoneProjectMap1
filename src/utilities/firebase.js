import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore/lite';

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

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});