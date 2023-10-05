import React from "react";
import { AuthContext } from "../signUp/Auth";

export default function Profile() {
  const user = React.useContext(AuthContext);

  return (
    <div className="page-container">
      <h3>Bonjour {user?.email}</h3>
    </div>
  );
}
