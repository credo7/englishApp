import { authAction } from "../../types/auth";

export const authReducer = (state = false, action: authAction) => {
  switch (action.type) {
    case "TRUE": {
      return true;
    }
    case "FALSE": {
      return false;
    }
    default:
      return state;
  }
};
