import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { clearUserFromStorage, setUserInStorage } from "./setStorage";

const handleFetchCall = (url?: string | undefined, method?: string, data?: object, bearer:boolean=false) => {
  
  const { user } = useContext(AuthContext);

  const checkToken = ()=>{
    if (user) {
      const expire_time = JSON.parse(localStorage.getItem("expireTime")|| "")
      console.log(Date.now(), expire_time)
      if (Date.now() > Number(expire_time)) {
        console.log("Timed out access");
        updateToken();
      } else {
        console.log((Number(expire_time) - Date.now()) / 1000 + " sec");
      }
    }else{
      console.log("not logged in")
    }

  }
  const updateToken = async () => {
    const refresh_token = JSON.parse(localStorage.getItem("refreshToken")||"")

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
        clearUserFromStorage();
        
    } else  {
        setUserInStorage(res.access_token, res.refresh_token, String(user), res.expires_in)
        console.log("updated");
    } 
  };

 

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const bearerHeader =  {
    "Content-Type": "application/json",
    Accept: "application/json",
    //Authorization: "Bearer "+JSON.parse(localStorage.getItem("accessToken") || ""),
    } 


  const fetchNow = async (url: string, method: string, data?: object, bearer:boolean=false) => {
    checkToken();
   // bearer ? headers["Authorization"]= "Bearer " + String(accessToken),
    console.log( bearer? bearerHeader : headers)
    try {
      const response = await fetch(url, {
        method,
        headers: bearer ? bearerHeader : headers,
        body: data ? JSON.stringify(data) : null,
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
