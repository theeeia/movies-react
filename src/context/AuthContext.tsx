import React, { createContext, useState } from "react";
import { AuthenticationContext } from "./interfaces";

export const AuthContext = createContext<AuthenticationContext>({} as AuthenticationContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(() =>
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "") : null,
  );

  const contextData = {
    user: user,
    setUser: setUser,
  };

  return <AuthContext.Provider value={contextData}>{children} </AuthContext.Provider>;
}
