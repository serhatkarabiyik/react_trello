import React, { useState } from "react";
import { getAllUsers } from "../../firebase";

export default function Admin() {
  const users = getAllUsers();

  console.log(users);

  return (
    <table>
      <thead>
        <tr>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {/* {console.log(users)}
        {users.forEach((user) => {
          return (
            <tr>
              <td>{user.email}</td>
            </tr>
          );
        })} */}
      </tbody>
    </table>
  );
}
