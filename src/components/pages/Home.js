import React from "react";
import SignUp from "../signUp/SignUp";
import TodoList from "./TodoList";
import { AuthContext } from "../signUp/Auth";
import ProjectPage from "./ProjectPage";

export default function Home() {
  const user = React.useContext(AuthContext);

  return <div>{!user ? <SignUp /> : <ProjectPage />}</div>;
}
