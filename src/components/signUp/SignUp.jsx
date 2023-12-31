import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { auth, firestore } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleMail = (e) => {
    setEmail(e.target.value);
  };

  const handlePass = (e) => {
    setPass(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
          id: user.uid,
          email: user.email,
        };
        addDoc(collection(firestore, "users"), userData)
          .then(() => {
            console.log("User ajouter");
          })
          .catch((e) => console.log(e));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div className="page-container">
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
          type="email"
          value={email}
          onChange={handleMail}
        />
        <TextField
          id="standard-basic"
          label="Mot de passe"
          variant="standard"
          type="password"
          value={pass}
          onChange={handlePass}
        />
        <Button type="submit" className="primary-btn">
          S'inscrire
        </Button>
        <Link to="/signIn">Have an account ? Sign In</Link>
      </form>
    </div>
  );
}
