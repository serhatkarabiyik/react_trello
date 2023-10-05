import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

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
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
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
          value={email}
          onChange={handleMail}
        />
        <TextField
          id="standard-basic"
          label="Mot de passe"
          variant="standard"
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
