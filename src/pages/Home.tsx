import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader/Loader";

// Context
import { AuthContext } from "../context/AuthContext";

// Utilities
import handleFetchCall from "../utils/handleFetchCall";
import { handleLogoutUser } from "../utils/handleLocalStorage";

export default function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  /*================
  CHECK TOKEN

  Send a request to check if the token is valid or needs to be refreshed
  ================*/
  const { loading, handleFetch } = handleFetchCall();

  const handleCheckToken = async () => {
    const url = "https://jsonplaceholder.typicode.com/posts";
    const method = "POST";
    const body = {
      title: "foo",
      body: "bar",
      userId: 1,
    };

    const res = await handleFetch(url, method, body);
    console.log(res);
  };

  /*================
  LOGOUT USER

  Log out the user and clear tokens and user email from local storage
  ================*/
  const [loadingLogout, setLoadingLogout] = useState(false);
  const handleLogout = async () => {
    setLoadingLogout(true);
    const access_token = JSON.parse(localStorage.getItem("accessToken") || "");

    try {
      const response = await fetch("https://movies.codeart.mk/api/auth/logout", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        method: "POST",
      });

      handleLogoutUser();
      if (!response.ok) {
        throw new Error("Cannot logout");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
    setLoadingLogout(false);
  };

  return (
    <div className="home-page">
      <div>
        {" "}
        Hello <>{user}</>
      </div>

      <button onClick={handleCheckToken} disabled={loading} className="button">
        {loading ? <Loader /> : "Check token"}
      </button>
      <button onClick={handleLogout} disabled={loadingLogout} className="button">
        {loadingLogout ? <Loader /> : "Logout"}
      </button>
      <button
        onClick={() => {
          navigate("/account-edit");
        }}
        className="button"
      >
        Edit Account
      </button>
    </div>
  );
}
