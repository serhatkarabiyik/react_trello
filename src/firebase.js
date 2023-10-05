// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  getDocFromCache,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFNOPidPWkn8hteWS0V0A674WRKfdP9Co",
  authDomain: "reacttrello-7deec.firebaseapp.com",
  projectId: "reacttrello-7deec",
  storageBucket: "reacttrello-7deec.appspot.com",
  messagingSenderId: "388950866791",
  appId: "1:388950866791:web:6d7842dcb35dbe36eacdc2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const db = getFirestore();
const usersCol = collection(db, "users");

let users = [];

getDocs(usersCol)
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    });
    console.log(users);
  })
  .catch((e) => console.log(e));