import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";

// Context
import { AuthContext } from "../context/AuthContext";

// Utilities
import handleFetchCall from "../utils/handleFetchCall";
import { clearUserFromLocalStorage } from "../utils/handleLocalStorage";

export default function Home() {
  const { user } = useContext(AuthContext);

  /*================
  CHECK TOKEN

  Send a request to check if the token is valid or needs to be refreshed
  ================*/
  const { loading, fetchNow } = handleFetchCall();

  const handleCheckToken = async () => {
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

  /*================
  LOGOUT USER

  Log out the user and clear tokens and user email from local storage
  ================*/
  const handleLogout = async () => {
    const url = "https://movies.codeart.mk/api/auth/logout";
    const method = "POST";

    await fetchNow(url, method, undefined, true);

    clearUserFromLocalStorage();
  };

  return (
    <div className="home_page">
      <ToastContainer />
      <div>
        {" "}
        Hello <>{user}</>
      </div>

      <button onClick={handleCheckToken} disabled={loading}>
        Check token
      </button>
      <button onClick={handleLogout} disabled={loading}>
        Logout
      </button>
    </div>
  );
}
