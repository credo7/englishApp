import axios, { AxiosResponse } from "axios";
import { ApiUser, ApiUserLogin } from "../models/ApiTypes";
import { User } from "../models/User";
import { removeToken, setToken } from "../utils/token";
import { api } from "./api";

export const logout = () => {
	return api.post('/users/logout');
};

export const getCurrentUser = async (accessToken: string): Promise<User | null> => {
	try {
		const usr = await axios
			.get<ApiUser | null>('/auth', {
				params: {},
				headers: { Authorization: `Bearer ${accessToken}` },
			})
			.then((res) => res.data);

		if (usr) {
			const user = new User();
			user.id = usr.id;
			user.username = usr.login;
			user.urlAvatar = usr.url_avatar;

			return user;
		}

		return null;
	} catch {
		return null;
	}
};

export const signIn = async (
	username: string,
	password: string,
	setUser: (usr: User) => void,
	setErrors: React.Dispatch<React.SetStateAction<string>>,
): Promise<void> => {
	const r = await axios
		.post<{ username: string; password: string | null }, AxiosResponse<ApiUserLogin>>("/users/login", {
			username,
			password,
		})
		.then((res) => res.data)
		.catch(() => {
			setErrors("Login Error");

			return null;
		});

	if (!r) return;
	const { access_token: accessToken } = r;

	if (accessToken) {
		setToken(accessToken);
		getCurrentUser(accessToken)
			.then((usr) => {
				if (usr) {
					setUser(usr);
				} else {
					removeToken();
				}
			});
	}
};