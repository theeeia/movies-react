import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/user-context';

export default function Home() {
  const { user } = useContext(UserContext);

  const handleClick= () => {

    if(Date.now() > user.expires_in){
      console.log("Timed out")
    }else{
      console.log(user.expires_in - Date.now())
    }

  }

  return (
    <>
      <div> {"fafa"}</div>
      <button onClick={handleClick}>Check token</button>
      <Link to={"/login"}>Login</Link>
    </>
 
  )
}
