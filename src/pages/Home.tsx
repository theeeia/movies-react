import { useContext, useState } from "react";
import { Link } from "react-router-dom";

// Context
import { AuthContext } from "../context/AuthContext";

// Components
import Loader from "../components/Loader/Loader";

// Utilities
import handleFetchCall from "../utils/handleFetchCall";
import handleLogoutUser from "../utils/handleLogoutUser";

export default function Home() {
  const { user } = useContext(AuthContext);

  /*================
  CHECK TOKEN

  Send a request to check if the token is valid or needs to be refreshed
  ================*/
  const { loading, handleFetch } = handleFetchCall();

  // NOTE: This is used only for testing
  // Send a request to check if the token is valid
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
    try {
      await handleLogoutUser();
    } finally {
      setLoadingLogout(false);
    }
  };

  return (
    <div className="home-page">
      <div>
        Hello <>{user}</>
      </div>

      <button onClick={handleCheckToken} disabled={loading} className="button">
        {loading ? <Loader /> : "Check token"}
      </button>
      <button onClick={handleLogout} disabled={loadingLogout} className="button">
        {loadingLogout ? <Loader /> : "Logout"}
      </button>
      <Link to="/account/edit" className="button link-button">
        Edit Account
      </Link>
      <Link to="/account/privileges" className="button link-button">
        Privileges
      </Link>
    </div>
  );
}
