import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../models/User";
import { getToken } from "../../utils/token";
import * as AuthApi from "../../api/auth";

interface CurrentUserState {
	currentUser: IUser;
}

const initialState: CurrentUserState = {
	currentUser: {
		id: -1,
		username: '',
		urlAvatar: '',
		loginDate: 0,
		isAuthorized: !!getToken(),
	},
};

export const logoutAction = createAsyncThunk(
	'currentUser/logout',
	async () => {
		await AuthApi.logout();
	},
);

export const getCurrentUserAction = createAsyncThunk(
	'currentUser/getCurrentUser',
	async (sockId: string, { rejectWithValue }) => {
		try {
			const user = await getCurrentUser(sockId);

			if (user) {
				const { id, login, url_avatar } = user;
				const newUser = new User();
				newUser.id = id;
				newUser.username = login;
				newUser.urlAvatar = url_avatar;

				return newUser;
			}

			return rejectWithValue('');
		} catch {
			return rejectWithValue('');
		}
	},
);