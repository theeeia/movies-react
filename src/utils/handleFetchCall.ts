import { useContext, useState } from "react";

// Context
import { AuthContext } from "../context/AuthContext";

// Utilities
import { handleSaveUserInLocalStorage } from "./handleSaveUserInLocalStorage";
import handleLogoutUser from "./handleLogoutUser";
import { toast } from "react-toastify";

const handleFetchCall = () => {
  /*================
  UPDATE TOKEN

  Send a request to refresh the access token and update it in the local storage,
  if the refresh token is not valid, log out the user and clears the tokens from local storage
  ================*/

  const handleUpdateToken = async (user: string) => {
    const refresh_token = JSON.parse(localStorage.getItem("refreshToken") || "");

    try {
      const response = await fetch("https://movies.codeart.mk/api/auth/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          refresh_token: refresh_token,
        }),
      });
      const res = await response.json();

      if (res.error) {
        // If the request to update the token is not successful, logout the user
        handleLogoutUser();
        throw new Error(res.error);
      } else {
        handleSaveUserInLocalStorage(
          res.access_token,
          res.refresh_token,
          String(user),
          res.expires_in,
        );
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  /*================
  CHECK  TOKEN
  
  Check if the token is expired and needs to be refreshed if a user is logged in
  ================*/
  const { user } = useContext(AuthContext);

  const handleCheckToken = () => {
    if (user) {
      const expire_time = JSON.parse(localStorage.getItem("expireTime") || "");

      // If the time of the access token is expired, update it with the refresh token
      if (Date.now() > Number(expire_time)) {
        handleUpdateToken(user);
      }

      const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
      return accessToken;
    }
    return null;
  };

  /*================
    FETCH

  Send a fetch request with the provided url, method, data and authorization
  ================*/
  const [loading, setLoading] = useState(false);

  const handleFetch = async (url: string, method: string, body?: Record<string, any>) => {
    setLoading(true);

    // Check if the token is valid
    const accessToken = await handleCheckToken();

    // Proceed with the request and return the response
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + accessToken,
        },
        ...(body && { body: JSON.stringify(body) }),
      });

      const res = await response.json();

      if (!response.ok) {
        throw Error(res.message);
      }

      setLoading(false);
      return res;
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
      throw Error(error);
    }
  };

  return { loading, handleFetch };
};

export default handleFetchCall;
