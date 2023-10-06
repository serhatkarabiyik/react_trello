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
import "firebase/firestore";

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

const firestore = getFirestore();
export { firestore };

export const projectCollection = collection(firestore, "projects");

let projets = [];

getDocs(projectCollection)
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      projets.push({ ...doc.data(), id: doc.id });
    });
    console.log(projets);
  })
  .catch((e) => console.log(e));
