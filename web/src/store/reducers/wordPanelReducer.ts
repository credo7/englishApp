import { wordPanel } from "../../types/wordPanel";

export const wordPanelReducer = (state = false, action: wordPanel) => {
  switch (action.type) {
    case "WORD_VISIBLE_TRUE": {
      return true;
    }
    case "WORD_VISIBLE_FALSE": {
      return false;
    }
    default:
      return state;
  }
};