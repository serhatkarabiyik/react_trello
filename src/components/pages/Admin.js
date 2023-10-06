import React, { useState, useEffect } from "react";
import { getAllUsers, userCollection } from "../../firebase";

import { deleteDoc, doc } from "firebase/firestore";

export default function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs :",
          error
        );
      }
    }

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteDoc(doc(userCollection, userId));

      console.log("Document supprimé avec succès.");
    } catch (error) {
      console.error("Erreur lors de la suppression du document :", error);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{user.email}</td>
            <td>
              <button onClick={() => handleDeleteUser(user.uid)}>
                Supprimer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
