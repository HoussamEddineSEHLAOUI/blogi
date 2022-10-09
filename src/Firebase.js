// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  uploadBytesResumable,
  getDownloadURL,
  ref,
  getStorage,
} from "firebase/storage";
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcVoNc09suFG1Fd8LuJ8cp2ghB21jjR04",
  authDomain: "blog-test-frontend.firebaseapp.com",
  projectId: "blog-test-frontend",
  storageBucket: "blog-test-frontend.appspot.com",
  messagingSenderId: "264456282180",
  appId: "1:264456282180:web:d4b64ebaeb291ea7569c11",
  measurementId: "G-DHPWZ6NMJB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Get the database
export const database = getFirestore(app);
// uplod video in storge and return public url
export const uplodToStorageAndGetUrlPublic = async (file) => {
  const filePath = `/${file.name}`;
  const newVideoRef = ref(getStorage(), filePath);
  await uploadBytesResumable(newVideoRef, file);
  const publicUrl = await getDownloadURL(newVideoRef);
  return publicUrl;
};
//initialize firebase auth
export const auth = getAuth();
