// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCsgac_9LCpr1KKOgLItim6CVBST3-TgiU",
    authDomain: "iete-quiz-app.firebaseapp.com",
    projectId: "iete-quiz-app",
    storageBucket: "iete-quiz-app.appspot.com",
    messagingSenderId: "19793962014",
    appId: "1:19793962014:web:b591a5be1d0dc0bba7fa0f",
    measurementId: "G-PGJP778CS3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const firestore = getFirestore(app);
const auth = getAuth(app);

export {  storage, firestore, auth }