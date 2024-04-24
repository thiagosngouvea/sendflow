// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBigpPO373iW3VhcztRA41iXUmI-7AZUbw",
  authDomain: "sendflow-b1be7.firebaseapp.com",
  databaseURL: "https://sendflow-b1be7-default-rtdb.firebaseio.com",
  projectId: "sendflow-b1be7",
  storageBucket: "sendflow-b1be7.appspot.com",
  messagingSenderId: "934451855273",
  appId: "1:934451855273:web:f03cb55f47f362fa03ceb8"
};

// Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const storage = getStorage(firebase_app);

const db = getFirestore(firebase_app);

export { db };

export default firebase_app;