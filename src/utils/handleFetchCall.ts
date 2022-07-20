import { useContext, useEffect } from "react";

//context
import { AuthContext } from "../context/AuthContext";
//utils
import { clearUserFromStorage, setUserInStorage } from "./setStorage";

const handleFetchCall = (
  url?: string | undefined,
  method?: string,
  data?: object,
  bearer: boolean = false,
) => {
  const { user } = useContext(AuthContext);

  //updates the access token if the refresh token is valid
  const updateToken = async (user: string) => {
    const refresh_token = JSON.parse(localStorage.getItem("refreshToken") || "");

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
      console.log("Timed out refresh token");
      clearUserFromStorage();

      console.log("logged out");
    } else {
      setUserInStorage(res.access_token, res.refresh_token, String(user), res.expires_in);
      console.log("updated");
    }
  };

  //checks if access token is valid
  const checkToken = () => {
    if (user) {
      const expire_time = JSON.parse(localStorage.getItem("expireTime") || "");
      if (Date.now() > Number(expire_time)) {
        console.log("Timed out access");
        updateToken(user);
      } else {
        console.log((Number(expire_time) - Date.now()) / 1000 + " sec");
      }
      const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
      return accessToken;
    }
    return null;
  };

  const fetchNow = async (url: string, method: string, data?: object, bearer: boolean = false) => {
    const accessToken = checkToken();

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(bearer && { Authorization: "Bearer " + accessToken }),
        },
        body: data ? JSON.stringify(data) : null,
      });

      const res = await response.json();
      return res;
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (url && method) {
      fetchNow(url, method, data);
    }
  }, []);

  return { fetchNow };
};

export default handleFetchCall;
