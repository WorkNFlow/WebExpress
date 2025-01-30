// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDvpUHoIqn5sBFiabKQDZHX94omARNVmrU",
    authDomain: "web-express-f923e.firebaseapp.com",
    projectId: "web-express-f923e",
    storageBucket: "web-express-f923e.firebasestorage.app",
    messagingSenderId: "687594306598",
    appId: "1:687594306598:web:dbf85e2584b3b7ffc53ae7",
    measurementId: "G-MM59R15P6S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);