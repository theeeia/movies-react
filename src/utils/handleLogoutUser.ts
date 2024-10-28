const basename = '/movies-react';

async function handleLogoutUser() {
  const access_token = JSON.parse(localStorage.getItem("accessToken") || "");

  await fetch("https://movies.codeart.mk/api/auth/logout", {
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

  setTimeout(() => {
    window.location.href = `${basename}/login`;
  }, 1000);

}

export default handleLogoutUser;
