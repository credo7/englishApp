export interface ApiUserCreate {
  ok: boolean;
  msg: string;
}

export interface ApiUser {
  id: number;
  login: string;
  url_avatar: string;
}

export interface ApiUserLogin {
	access_token: string | null;
	twoFactorAuthentication: boolean;
}
