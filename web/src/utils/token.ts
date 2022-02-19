export const getToken = (): string => {
  return sessionStorage.getItem("access_token") || "";
};

export const setAccessToken = (token: string): void => {
  sessionStorage.setItem("access_token", token);
};

export const setRefreshToken = (token: string): void => {
  sessionStorage.setItem("refresh_token", token);
};

export const removeToken = (): void => {
  sessionStorage.removeItem("access_token");
};
