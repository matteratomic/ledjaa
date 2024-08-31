// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbjCBSTUh2R8fwNii-QitATkDoSWk7jp4",
  authDomain: "kelele-4fde1.firebaseapp.com",
  databaseURL: "https://kelele-4fde1-default-rtdb.firebaseio.com",
  projectId: "kelele-4fde1",
  storageBucket: "kelele-4fde1.appspot.com",
  messagingSenderId: "197996371357",
  appId: "1:197996371357:web:b889cc5154dbb5eeb82374",
  measurementId: "G-XLDZR1DJC4"
};


const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };