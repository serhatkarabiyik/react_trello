// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore, getDocs, collection, addDoc, query, where } from "firebase/firestore";

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

export const firestore = getFirestore();

export const projectCollection = collection(firestore, "project");

export const getAllProjects = async () => {
  try {
    const projectsSnapshot = await getDocs(projectCollection);
    const projects = [];

    projectsSnapshot.forEach((doc) => {
      projects.push({ ...doc.data(), id: doc.id });
    });

    return projects;
  } catch (error) {
    console.error("Erreur lors de la récupération des projets : ", error);
    throw error;
  }
};

export const userCollection = collection(firestore, "users");

export const getAllUsers = async () => {
  try {
    const usersSnapshot = await getDocs(userCollection);
    const users = [];

    usersSnapshot.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    });

    return users;
  } catch (error) {
    console.error("Erreur lors de la récupération des users : ", error);
    throw error;
  }
};


export const getUserIdByEmail = async (email) => {
  const usersCollection = collection(firestore, "users");
  const q = query(usersCollection, where("email", "==", email));
  console.log(usersCollection)
  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      // Aucun utilisateur trouvé avec cet e-mail
      console.log("Aucun utilisateur trouvé avec cet e-mail")
      return null;
    } else {
      // Retourne l'ID du premier utilisateur trouvé avec cet e-mail
      return querySnapshot.docs[0].id;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de l'ID de l'utilisateur :", error);
    throw error;
  }
};

export const addUserToProject = async (projectId, userId) => {
  try {
    const projectUsersCollection = collection(firestore, `project/${projectId}/users`);
    await addDoc(projectUsersCollection, {
      userId: userId,
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'utilisateur au projet : ", error);
    throw error;
  }
};
