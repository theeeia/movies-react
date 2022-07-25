import { toast } from "react-toastify";

async function handleLogoutUser() {
  const access_token = JSON.parse(localStorage.getItem("accessToken") || "");

  try {
    const response = await fetch("https://movies.codeart.mk/api/auth/logout", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      method: "POST",
    });

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("expireTime");
    toast.success("Logged out");
    setTimeout(() => {
      window.location.reload();
    }, 1000);

    if (!response.ok) {
      throw new Error("Expired Token");
    }
  } catch (error: any) {
    toast.error(error.message);
  }
}

export default handleLogoutUser;
