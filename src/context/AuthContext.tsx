import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
}
interface Context {
  user: User,
  expireTime: string,
  loginUser: (arg:Login) => void,
  registerUser: (arg:Register) => void,
  logoutUser: () => void,
  updateToken: () => void,
  children?: React.ReactNode

}
interface Login {
  email: string,
  password: string
}

interface Register extends Login{
  first_name: string,
  last_name: string
}


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
  LOGIN USER
  sends a login request and stores the access token, refresh token, user email and expire time in local storage
================*/


  const loginUser = async (values: Login) => {
    
    const response = await fetch("https://movies.codeart.mk/api/auth/login", {
      ...postReq,
      body: JSON.stringify(values),
    });

    const res = await response.json();

    if (response.status === 200) {
      
      setAccessToken(res.access_token);
      setRefreshToken(res.refresh_token);
      setUser(values.email);

      localStorage.setItem("accessToken", JSON.stringify(res.access_token));
      localStorage.setItem("refreshToken", JSON.stringify(res.refresh_token));
      localStorage.setItem("user", JSON.stringify(values.email));

      let expire = Date.now();
      expire = expire + res.expires_in * 1000; // add 300 seconds in miliseconds
 
      localStorage.setItem("expireTime", JSON.stringify(expire));
      setExpireTime(expire);

      navigate("/home");
    }else{
      alert("invalid creditentials")
      console.log(res)
    }
  };

/*================
  REGISTER USER
  send a register request 
================*/
  const registerUser = async (values: Register) => {

    try{
      const response = await fetch("https://movies.codeart.mk/api/auth/register", {
        ...postReq,
        body: JSON.stringify(values),
      });
      const res = await response.json();
      if(response.status ===200) {
          console.log("Registered")

      }else{ 
        console.log(res.errors)
      }
    }catch(e){ 

      console.error(e)
    }
    
  };


  /*================
  LOGOUT USER
  sends a logout request and clear the tokens, user and expire time from local storage
================*/
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

    if(res.error=="invalid_request"){

        console.log("Timed out refresh")
        logoutUser()
    } else if (response.status === 200) {
      setAccessToken(res.access_token);
      setRefreshToken(res.refresh_token);

      localStorage.setItem("accessToken", JSON.stringify(res.access_token));
      localStorage.setItem("refreshToken", JSON.stringify(res.refresh_token));
      let expire = Date.now();
      expire = expire + res.expires_in * 1000; // add 300 seconds in miliseconds
 
      localStorage.setItem("expireTime", JSON.stringify(expire));
      setExpireTime(expire);

      console.log("update");
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
