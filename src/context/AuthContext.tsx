import React, { createContext, useState } from "react";
import { Context } from "./interfaces";


export const AuthContext = createContext<Context>({} as Context);

export function AuthProvider({ children }: { children: JSX.Element|JSX.Element[] }) {
  const [user, setUser] = useState(() =>
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "") : null,
  );
  

  /*================
  LOGOUT USER
  sends a logout request and clear the tokens, user and expire time from local storage
================*/
  const logoutUser = async () => {
      await fetch("https://movies.codeart.mk/api/auth/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer "+JSON.parse(localStorage.getItem("accessToken")|| ""),
      },
      body: "",
    });

    console.log("logout");
  };

  const contextData = {
    user: user,
    setUser:setUser,
    logoutUser: logoutUser,
  };

  return <AuthContext.Provider value={contextData}>{children} </AuthContext.Provider>;
}
