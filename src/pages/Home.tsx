import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import handleFetchCall from "../utils/handleFetchCall";
import { setUserInStorage } from "../utils/setStorage";

export default function Home() {
  const { user, expireTime, logoutUser, updateToken, clearUserFromStorage} = useContext(AuthContext);
  const { fetchNow } = handleFetchCall();
  
  const handleClick = async () => {
    if (Date.now() > Number(expireTime)) {
      console.log("Timed out home");
      const url = "https://movies.codeart.mk/api/auth/refresh-token";
      const method = "POST";
      const token= localStorage.getItem("refreshToken") || ""
      const data = JSON.parse(token)
      if(data){
          const res = await fetchNow(url, method, {refresh_token: data} );
          console.log(res)
          setUserInStorage(res.access_token, res.refresh_token, String(user), res.expires_in)
      }

      
      
    } else {
      console.log((Number(expireTime) - Date.now())/1000 + " sec");
    }
  };
  
  const handleLogout = () => {
    logoutUser();
  };

  return (
    <div className="home_page">
      <div > Hello <>{user}</></div>

      <button onClick={handleClick}>Check token</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
