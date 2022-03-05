import { AxiosResponse } from "axios";
import { setToken } from "../utils/token";
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
      "auth/login",
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

  const { access_token: accessToken } = r;

  if (accessToken) {
    setToken(accessToken);
  }
};
