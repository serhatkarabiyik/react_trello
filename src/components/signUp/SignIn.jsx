import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button, TextField } from "@mui/material";
import { auth } from "../../firebase";

export default function SignIn() {
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
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div className="page-container">
      <h1>Sign In</h1>

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
        <Button type="submit">Se connecter</Button>
      </form>
    </div>
  );
}