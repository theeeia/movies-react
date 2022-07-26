import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

// Utilities
import handleFetchCall from "../../utils/handleFetchCall";
import handleLogoutUser from "../../utils/handleLogoutUser";

function Admin() {
  const [role, setRole] = useState("");
  const [countdown, setCountdown] = useState<number | null>(null);
  const { handleFetch } = handleFetchCall();

  const navigate = useNavigate();
  /*================
    GET USER ROLE

  Get the role of the user, start the countdown if the role is user and logout 
  ================*/

  const { status, data } = useQuery(
    ["user"],
    async () => await handleFetch("https://movies.codeart.mk/api/users/me", "GET", undefined, true),
  );
  useEffect(() => {
    if (status === "success") {
      setRole(data.role.name);

      setCountdown(5);
    }
  }, [status]);

  // Start countdown
  useEffect(() => {
    if (countdown === 0) {
      setCountdown(null);
      handleLogoutUser();
    }

    if (!countdown) return;

    const intervalId = setInterval(() => {
      setCountdown(countdown - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [countdown]);

  return (
    <div className="home-page">
      {status !== "success" ? (
        <Loader />
      ) : role == "user" ? (
        "Sorry, you're not an admin and you do not have access privileges to this page. You will be redirected in " +
        countdown +
        " seconds"
      ) : (
        "Congratulations, you're an admin in the Miru movies web application."
      )}

      <button
        onClick={() => {
          navigate("/home");
        }}
        className="button"
      >
        Back
      </button>
    </div>
  );
}

export default Admin;
