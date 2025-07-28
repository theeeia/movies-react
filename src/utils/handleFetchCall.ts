import { getIdToken } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

const handleFetchCall = () => {
  const handleFetch = async (url: string, method: string, body?: Record<string, any>) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("User is not authenticated");
      }

      // Get a fresh Firebase ID token
      const accessToken = await getIdToken(user, true); // true = force refresh

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
        throw new Error(res.message || "Request failed");
      }

      return res;
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
      throw error;
    }
  };

  return { handleFetch };
};

export default handleFetchCall;
