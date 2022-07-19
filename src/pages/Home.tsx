import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import handleFetchCall from "../utils/handleFetchCall";
import { clearUserFromStorage } from "../utils/setStorage";

export default function Home() {
  const [navigate, setNavigate] = useState(false);
  const { user, logoutUser, setUser} = useContext(AuthContext);
  const { fetchNow } = handleFetchCall();
  
  const handleClick = async () => {
   
      /*
      const url = 'https://jsonplaceholder.typicode.com/posts/1'
      const method = "GET"
      const res= await fetchNow(url, method)
      console.log(res)*/

      const url = 'https://jsonplaceholder.typicode.com/posts'
      const method = "POST"
      const body= {
        title: 'foo',
        body: 'bar',
        userId: 1,
      }
      const res= await fetchNow(url, method, body)
      console.log(res)
    
  
  };
  
  const handleLogout =  () => {
  /*  const url = "https://movies.codeart.mk/api/auth/logout"
    const method = "POST"
    const bearer=true
    const res= await fetchNow(url, method, undefined,bearer)
    console.log(res)*/
    logoutUser()
    clearUserFromStorage();
    setUser(null)
    setNavigate(true);
  };
  
  if (navigate) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="home_page">
      <div > Hello <>{user}</></div>

      <button onClick={handleClick}>Check token</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
