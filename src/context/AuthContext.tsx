import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearUserFromStorage, setUserInStorage } from "../utils/setStorage";
import { Context, Login, Register } from "./interfaces";


export const AuthContext = createContext<Context>({} as Context);

export function AuthProvider({ children }: { children: JSX.Element|JSX.Element[] }) {
  //checks if theres an access token in local storage and stores it in state otherwise it sets null
  // so callback za da ne se proveruvat nasekoe tuku samo ednash

  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem("accessToken")
      ? JSON.parse(localStorage.getItem("accessToken") || "")
      : null,
  );
  const [refreshToken, setRefreshToken] = useState(() =>
    localStorage.getItem("refreshToken")
      ? JSON.parse(localStorage.getItem("refreshToken") || "")
      : null,
  );
  const [expireTime, setExpireTime] = useState(() =>
    localStorage.getItem("expireTime")
      ? JSON.parse(localStorage.getItem("expireTime") || "")
      : null,
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "") : null,
  );

  const [rememberMe, setRememberMe] = useState(() =>
    localStorage.getItem("rememberMe") ? JSON.parse(localStorage.getItem("rememberMe") || "") : false,
  );

  // headers for login 
  const postReq = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  // navigation hook to redirect to pages
  const navigate = useNavigate();

 
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
        Authorization: "Bearer " + String(accessToken),
      },
      body: "",
    });

    clearUserFromStorage();

    navigate("/login");
    console.log("logout");
  };

  /*================
  UPDATE ACCESS TOKEN
  sends a request to refresh the access token, if it fails because the refresh token is expired it calls the logout function
================*/
  const updateToken = async () => {
    const response = await fetch("https://movies.codeart.mk/api/auth/refresh-token", {
      ...postReq,
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
    });
    const res = await response.json();

    if(res.error){
        console.log("Timed out refresh token");
        //cant call logout because access token in expired
        clearUserFromStorage();
    } else  {
        setUserInStorage(res.access_token, res.refresh_token, user, res.expires_in)
        console.log("updated");
    } 
  };

  const contextData = {
    user: user,
    expireTime: expireTime,
    rememberMe: rememberMe,
    setUser:setUser,
    logoutUser: logoutUser,
    updateToken: updateToken,
    clearUserFromStorage: clearUserFromStorage,
    setUserInStorage: setUserInStorage
  };

  return <AuthContext.Provider value={contextData}>{children} </AuthContext.Provider>;
}
