export const setUserInLocalStorage = (
  access: string,
  refresh: string,
  email: string,
  expires_in: number,
) => {
  localStorage.setItem("accessToken", JSON.stringify(access));
  localStorage.setItem("refreshToken", JSON.stringify(refresh));
  localStorage.setItem("user", JSON.stringify(email));
  let expire = Date.now();
  expire = expire + expires_in * 1000; // add 300 seconds in miliseconds
  localStorage.setItem("expireTime", JSON.stringify(expire));
};

export const clearUserFromLocalStorage = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
  localStorage.removeItem("expireTime");
  window.location.reload();
};
