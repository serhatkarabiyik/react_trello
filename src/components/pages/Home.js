import React from "react";
import SignUp from "../signUp/SignUp";
import TodoList from "./TodoList";
import { useUser } from "../signUp/Auth";

export default function Home() {
  const user = useUser();
  return <div>{!user ? <SignUp /> : <TodoList />}</div>;
}
