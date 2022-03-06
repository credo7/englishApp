import { AxiosResponse } from "axios";
import { api } from "./api";

interface CreateUser {
  login: string;
  pass: string;
}

export const getUserByLogin = (login: string) => {
  return api
    .get<any | null>("auth/user", {
      params: { login },
    })
    .then((res) => res.data);
};

export const createUser = (
  login: string,
  password: string,
  loginUser: Function
) => {
  return api
    .post<CreateUser, AxiosResponse<any>>("auth/register", {
      login,
      password,
    })
    .then((res) => res.data)
    .then(() => loginUser(login, password));
};
