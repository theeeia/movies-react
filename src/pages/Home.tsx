import React, { useContext } from "react";

//context
import { AuthContext } from "../context/AuthContext";
//utils
import handleFetchCall from "../utils/handleFetchCall";
import { clearUserFromStorage } from "../utils/setStorage";

export default function Home() {
  const { user } = useContext(AuthContext);
  const { fetchNow } = handleFetchCall();

  const handleClick = async () => {
    /* test for GET 
      const url = 'https://jsonplaceholder.typicode.com/posts/1'
      const method = "GET"
      const res= await fetchNow(url, method)
      console.log(res)*/

    const url = "https://jsonplaceholder.typicode.com/posts";
    const method = "POST";
    const body = {
      title: "foo",
      body: "bar",
      userId: 1,
    };
    const res = await fetchNow(url, method, body);
    console.log(res);
  };

  const handleLogout = async () => {
    const url = "https://movies.codeart.mk/api/auth/logout";
    const method = "POST";

    await fetchNow(url, method, undefined, true);

    console.log("logout");

    clearUserFromStorage();
  };

  return (
    <div className="home_page">
      <div>
        {" "}
        Hello <>{user}</>
      </div>

      <button onClick={handleClick}>Check token</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
