import React from "react";
import { Auth } from "aws-amplify";

const Nav = ({ user }) => {
  const signOut = () => {
    Auth.signOut().catch((err) => console.log("error signing out: ", err));
  };

  return (
    <div>
      <h1>Cognito</h1>

      {user && (
        <>
          <p>email: {user.email}</p>
          <p>username: {user.preferred_username}</p>
          <button onClick={signOut}>Signout</button>
        </>
      )}
    </div>
  );
};

export default Nav;
