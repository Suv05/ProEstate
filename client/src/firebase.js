// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_OAUTH_API_KEY,
  authDomain: "prostate-d2554.firebaseapp.com",
  projectId: "prostate-d2554",
  storageBucket: "prostate-d2554.appspot.com",
  messagingSenderId: "987452278850",
  appId: "1:987452278850:web:30fcddab8b6436294945db",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
