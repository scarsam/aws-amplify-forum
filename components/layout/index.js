import React, { useState, useEffect } from "react";
import { Auth, Hub } from "aws-amplify";
import Nav from "./Nav";

const Layout = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return Hub.listen("auth", (data) => {
      const { payload } = data;
      if (payload.event === "signIn") return checkUser();
      if (payload.event === "signOut") return setUser(null);
    });
  }, []);

  const checkUser = async () => {
    try {
      const data = await Auth.currentUserPoolUser();
      const userInfo = { username: data.username, ...data.attributes };
      setUser(userInfo);
    } catch (err) {
      console.log("error: ", err);
    }
  };

  return (
    <>
      <Nav user={user} />
      {children}
    </>
  );
};

export default Layout;
