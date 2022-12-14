export const handleSaveUserInLocalStorage = (
  access: string,
  refresh: string,
  email: string,
  expires_in: number,
) => {
  localStorage.setItem("accessToken", JSON.stringify(access));
  localStorage.setItem("refreshToken", JSON.stringify(refresh));
  localStorage.setItem("user", JSON.stringify(email));
  let expire = Date.now();
  expire = expire + expires_in * 1000;
  localStorage.setItem("expireTime", JSON.stringify(expire));
};
