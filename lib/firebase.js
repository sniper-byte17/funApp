import { initializeApp } from "firebase/app";
import firebase from 'firebase/app'
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    // firebase config from the firebase console
    apiKey: "AIzaSyAorapEuvhz231iW1r9EQg3Ik6DT_p6vbU",
  authDomain: "next-4b45c.firebaseapp.com",
  projectId: "next-4b45c",
  storageBucket: "next-4b45c.appspot.com",
  messagingSenderId: "918879278704",
  appId: "1:918879278704:web:a1473881b200394c4bc6b5",
  measurementId: "G-NXG8E6VM1X"
};

// if(!firebase.app.length) {
//     firebase.initializeApp(firebaseConfig);
// }
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// export const firestore = firebase.firestore();
// export const storage = firebase.storage();
