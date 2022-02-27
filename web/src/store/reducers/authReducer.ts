import { authAction } from "../../types/auth";

export const authReducer = (state = false, action: authAction) => {
  switch (action.type) {
    case "AUTH_TRUE": {
      return true;
    }
    case "AUTH_FALSE": {
      return false;
    }
    default:
      return state;
  }
};
