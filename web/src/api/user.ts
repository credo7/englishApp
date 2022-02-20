import { AxiosResponse } from "axios";
import { api } from "./api";

interface ICreateUser {
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

export const createUser = (login: string, pass: string) => {
  return api
    .post<ICreateUser, AxiosResponse<any>>("auth/local/signup", {
      login,
      password: pass,
    })
    .then((res) => res.data)
};
