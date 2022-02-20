import { AxiosResponse } from "axios";
import { setAccessToken, setRefreshToken } from "../utils/token";
import { api } from "./api";

export const logout = () => {
  return api.post("/auth/logout");
};

export const signIn = async (
  username: string,
  password: string,
  setErrors: React.Dispatch<React.SetStateAction<string>>
): Promise<void> => {
  const r = await api
    .post<{ username: string; password: string | null }, AxiosResponse<any>>(
      "auth/local/signin",
      {
        login: username,
        password,
      }
    )
    .then((res) => res.data)
    .catch(() => {
      setErrors("Login Error");

      return null;
    });

  if (!r) return;

  const { access_token: accessToken, refresh_token: refreshToken } = r;

  if (accessToken && refreshToken) {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  }
};
