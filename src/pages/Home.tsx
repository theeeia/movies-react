import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Context
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader/Loader";

// Utilities
import handleFetchCall from "../utils/handleFetchCall";
import handleLogoutUser from "../utils/handleLogoutUser";

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
    handleLogoutUser();
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
      <button
        onClick={() => {
          navigate("/account/privileges");
        }}
        className="button"
      >
        Privileges
      </button>
    </div>
  );
}
