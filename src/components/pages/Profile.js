import React from "react";
import { useUser } from "../signUp/Auth";

export default function Profile() {
  const user = useUser();

  return (
    <div className="page-container">
      <h3>Bonjour {user.email}</h3>
    </div>
  );
}
