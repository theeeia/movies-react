import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// Utilities
import handleFetchCall from "../../utils/handleFetchCall";
import handleLogoutUser from "../../utils/handleLogoutUser";

function Admin() {
  const [role, setRole] = useState("");
  const [countdown, setCountdown] = useState(false);
  const { handleFetch } = handleFetchCall();
  const [seconds, setSeconds] = useState(-1);

  /*================
    GET USER ROLE

  Get the role of the user, start the countdown if the role is user and logout 
  ================*/

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await handleFetch(
          "https://movies.codeart.mk/api/users/me",
          "GET",
          undefined,
          true,
        );

        setRole(response.role.name);

        setSeconds(5);
        setCountdown(true);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchUser();
  }, []);

  // Start countdown
  useEffect(() => {
    if (seconds > 0 && role == "user" && countdown) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    }
    if (seconds == 0) {
      handleLogoutUser();
    }
  }, [seconds, countdown]);

  return (
    <div className="home-page">
      {role == "user"
        ? "Sorry, you're not an admin and you do not have access privileges to this page. You will be redirected in " +
          seconds +
          " seconds"
        : "Congratulations, you're an admin in the Miru movies web application."}
    </div>
  );
}

export default Admin;
