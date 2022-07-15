import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface Iuser {
  email: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export const AuthContext = createContext<any>({} as any);

export function AuthProvider({ children }: { children: any }) {
  // proveruvame dali ima vo local storage access token i ja citame taa vrednost ako ima, ako ne stavame null
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

  const postReq = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  const navigate = useNavigate();

  const loginUser = async (values: any) => {
    const response = await fetch("https://movies.codeart.mk/api/auth/login", {
      ...postReq,
      body: JSON.stringify(values),
    });

    const res = await response.json();

    if (response.status === 200) {
      console.log("set");
      setAccessToken(res.access_token);
      setRefreshToken(res.refresh_token);
      setUser(values.email);

      localStorage.setItem("accessToken", JSON.stringify(res.access_token));
      localStorage.setItem("refreshToken", JSON.stringify(res.refresh_token));
      localStorage.setItem("user", JSON.stringify(values.email));

      let expire = Date.now();
      expire = expire + res.expires_in * 1000; // add 300 seconds in miliseconds
      //expire = expire + 60000;

      localStorage.setItem("expireTime", JSON.stringify(expire));
      setExpireTime(expire);

      navigate("/home");
    }
  };

  const registerUser = async (values: any) => {
    const response = await fetch("https://movies.codeart.mk/api/auth/register", {
      ...postReq,
      body: JSON.stringify(values),
    });
    const res = await response.json();
    console.log(res);
  };

  const logoutUser = async () => {
    const response = await fetch("https://movies.codeart.mk/api/auth/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(accessToken),
      },
      body: "",
    });

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("expireTime");
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    setExpireTime(null);

    navigate("/login");
    console.log("logout");
  };

  const updateToken = async () => {
    const response = await fetch("https://movies.codeart.mk/api/auth/refresh-token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
    });
    const res = await response.json();

    console.log(res);

    if (response.status === 200) {
      setAccessToken(res.access_token);
      setRefreshToken(res.refresh_token);

      localStorage.setItem("accessToken", JSON.stringify(res.access_token));
      localStorage.setItem("refreshToken", JSON.stringify(res.refresh_token));
      let expire = Date.now();
      //expire = expire + res.expires_in * 1000; // add 300 seconds in miliseconds
      expire = expire + 30000;

      localStorage.setItem("expireTime", JSON.stringify(expire));
      setExpireTime(expire);

      console.log("update");
    }else {
      console.log("invalid")
      logoutUser()
    }
  };

  const contextData = {
    user: user,
    expireTime: expireTime,
    loginUser: loginUser,
    registerUser: registerUser,
    logoutUser: logoutUser,
    updateToken: updateToken,
  };

  return <AuthContext.Provider value={contextData}>{children} </AuthContext.Provider>;
}
