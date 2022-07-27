import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//Components
import Loader from "../../components/Loader/Loader";

// Utilities
import handleFetchCall from "../../utils/handleFetchCall";
import handleLogoutUser from "../../utils/handleLogoutUser";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

function Admin() {
  /*================
    GET USER ROLE

  Get the user and check his role, if its not admin, log out after 5 seconds
  ================*/
  const [role, setRole] = useState("");
  const { handleFetch } = handleFetchCall();

  const { status, data } = useQuery(["user"], () =>
    handleFetch("https://movies.codeart.mk/api/users/me", "GET"),
  );

  useEffect(() => {
    //check if the data object from the request is not empty
    if (!data || !Object.entries(data).length) return;

    // Set a timeout to logout the user
    setRole(data.role.name);
    if (data.role.name === "user") {
      toast("You will be logged out");
      setTimeout(() => {
        handleLogoutUser();
      }, 5000);
    }
  }, [data]);

  return (
    <div className="home-page">
      {status !== "success" ? (
        <Loader />
      ) : role == "user" ? (
        "Sorry, you're not an admin and you do not have access privileges to this page. You will be redirected in 5 seconds"
      ) : (
        <>
          Congratulations, you're an admin in the Miru movies web application.
          <Link to="/home" className="button link-button">
            Back
          </Link>
        </>
      )}
    </div>
  );
}

export default Admin;
