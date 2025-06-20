// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_3d9K1nnRRdzDNx83Blzw8UISebh_e5I",
  authDomain: "netflix-gpt-subaguru.firebaseapp.com",
  projectId: "netflix-gpt-subaguru",
  storageBucket: "netflix-gpt-subaguru.appspot.com",
  messagingSenderId: "804074244238",
  appId: "1:804074244238:web:da2e6083291d95e29ca1df",
  measurementId: "G-Y7CSDJMWKV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();