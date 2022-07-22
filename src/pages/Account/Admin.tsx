import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Admin() {
  const [role, setRole] = useState("user");
  const access_token = JSON.parse(localStorage.getItem("accessToken") || "");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("https://movies.codeart.mk/api/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        });
        const res = await response.json();
        if (!response.ok) {
          throw new Error("error");
        }
        setRole(res.role.name);
        console.log(res.role.name);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchUser();
  }, []);

  return <div className="home-page">{role}</div>;
}

export default Admin;
