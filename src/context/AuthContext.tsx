import React, { createContext, useState } from "react";
import { Context } from "./interfaces";

export const AuthContext = createContext<Context>({} as Context);

export function AuthProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
  const [user, setUser] = useState(() =>
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "") : null,
  );

  const contextData = {
    user: user,
    setUser: setUser,
  };

  return <AuthContext.Provider value={contextData}>{children} </AuthContext.Provider>;
}
