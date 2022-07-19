import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { setUserInStorage } from "./setStorage";

const handleFetchCall = (url?: string | undefined, method?: string, data?: object) => {
  
  const { user, expireTime,  } = useContext(AuthContext);
  const expire_time = localStorage.getItem("expireTime")
  
  const updateToken = async () => {
    const refresh_token = localStorage.getItem("refreshToken")

    console.log(refresh_token)
/*
    const response = await fetch("https://movies.codeart.mk/api/auth/refresh-token", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
      body: JSON.stringify({
        refresh_token: refresh_token,
      }),
    });
    const res = await response.json();

    if(res.error){
        console.log("Timed out refresh token");
        //cant call logout because access token in expired
        
    } else  {
        setUserInStorage(res.access_token, res.refresh_token, String(user), res.expires_in)
        console.log("updated");
    } */
  };

  if (user) {
    console.log("user")
    console.log(Date.now(), expire_time)
    if (Date.now() > Number(expire_time)) {
      console.log("Timed out");
      updateToken();
    } else {
      console.log((Number(expire_time) - Date.now()) / 1000 + " sec");
    }
  }

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const fetchNow = async (url: string, method: string, data?: object) => {
    try {
      const response = await fetch(url, {
        method,
        headers: headers,
        body: data ? JSON.stringify(data) : "",
      });

      const res = await response.json();
      return res;
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (url && method) {
      fetchNow(url, method, data);
    }
  }, []);

  return { fetchNow };
};

export default handleFetchCall;
