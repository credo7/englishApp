import { authAction } from "../../types/auth";

export const authReducer = (state = false, action: authAction) => {
  switch (action.type) {
    case "TOGGLE": {
      return !state;
    }
    default:
      return state;
  }
};
