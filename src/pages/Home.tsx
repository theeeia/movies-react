import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { user, expireTime, rememberMe, logoutUser, updateToken, clearUserFromStorage} = useContext(AuthContext);

  const handleClick = () => {
    if (Date.now() > Number(expireTime)) {
      console.log("Timed out");
      updateToken();
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
