export const getToken = (): string => {
  return localStorage.getItem("access_token") || "";
};

export const setToken = (token: string): void => {
  localStorage.setItem("access_token", token);
};

export const removeTokens = (): void => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};
