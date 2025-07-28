import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const basename = "/movies-react";

async function handleLogoutUser() {
  try {
    await signOut(auth);

    localStorage.removeItem("user");
    localStorage.removeItem("favorites");
    localStorage.removeItem("expireTime");

    setTimeout(() => {
      window.location.href = `${basename}`;
    }, 1000);
  } catch (error) {
    console.error("Logout failed:", error);
  }
}

export default handleLogoutUser;
