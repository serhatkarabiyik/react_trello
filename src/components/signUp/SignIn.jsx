import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button, TextField } from "@mui/material";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

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
        // Connexion réussie
        const user = userCredential.user;
        console.log(user);
        navigate("/project");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
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
          Se connecter
        </Button>
        <Link to="/">Don't have an account ? Sign Up</Link>
      </form>
    </div>
  );
}
