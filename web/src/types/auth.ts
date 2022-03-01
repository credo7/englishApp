export interface authAction {
  type: string;
  payload: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}