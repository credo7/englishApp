import { AxiosResponse } from "axios";
import { ApiUser, ApiUserCreate } from "../models/ApiTypes";
import { api } from "./api";

interface ICreateUser {
	login: string;
	pass: string;
}

export const getUserByLogin = (login: string) => {
	return api.get<ApiUser | null>('auth/user', {
			params: { login },
		})
			.then((res) => res.data);
};

export const createUser = (login: string, pass: string) => {
	return api.post<ICreateUser, AxiosResponse<ApiUserCreate>>('auth/users/create', {
			login,
			pass,
		})
			.then((res) => res.data);
};