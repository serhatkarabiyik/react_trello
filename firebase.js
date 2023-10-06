// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getFirestore,
  collection,
  getDocs,
  collection,
  doc
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

const firestore = getFirestore();

export function getAllProjects(){
  try {
    const projectsSnapshot = getDocs(projectCollection);
    const projects = [];

    projectsSnapshot.forEach((doc) => {
      projects.push({ ...doc.data(), id: doc.id });
    });

    return projects;
  } catch (error) {
    console.error("Erreur lors de la récupération des projets : ", error);
    throw error;
  }

}


export const projectCollection = collection(firestore, "project");

let projects = [];

getDocs(projectCollection)
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      projects.push({ ...doc.data(), id: doc.id });
    });
    console.log(projects);
  })
  .catch((e) => console.log(e));