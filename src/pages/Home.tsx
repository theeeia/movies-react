import { useContext, useState } from "react";
import { Link } from "react-router-dom";

// Context
import { AuthContext } from "../context/AuthContext";

// Components
import Loader from "../components/Loader/Loader";

// Utilities
import handleFetchCall from "../utils/handleFetchCall";
import handleLogoutUser from "../utils/handleLogoutUser";
import { useMutation } from "@tanstack/react-query";

export default function Home() {
  const { user } = useContext(AuthContext);

  /*================
  CHECK TOKEN

  Send a request to check if the token is valid or needs to be refreshed
  ================*/

  const { handleFetch } = handleFetchCall();

  const mutation = useMutation(
    ({ url, method, body }: { url: string; method: string; body: object }) =>
      handleFetch(url, method, body),
    {
      onSuccess: () => {
        console.log("Token is valid");
      },
    },
  );

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
    mutation.mutate({ url, method, body });
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
    <div className="home-page container ">
      <div>
        Hello <>{user}</>
      </div>

      <button onClick={handleCheckToken} disabled={mutation.isLoading} className="button">
        {mutation.isLoading ? <Loader /> : "Check token"}
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
