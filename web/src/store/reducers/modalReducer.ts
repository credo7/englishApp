import { modalAction, modal } from "../../types/modal";

const initialState:modal = {
  isActive: false,
  errorMessage: "Oops.. Something went wrong",
};

export const modalReducer = (state = initialState, action: modalAction):modal => {
  switch (action.type) {
    case "MODAL_ACTIVATE": {
      return {
        isActive: true,
        errorMessage: action.payload,
      };
    }
    case "MODAL_DEACTIVATE": {
      return {
        isActive: false,
        errorMessage: action.payload,
      };
    }
    default:
      return state;
  }
};
