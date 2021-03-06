import { wordAction, wordStructure } from "../../types/word";

const initialState: wordStructure = {
  word: "",
  transcription: "",
  meaning: "",
  example: "",
  audioURL: "",
};

export const currentWordReducer = (
  state = initialState,
  action: wordAction
) => {
  switch (action.type) {
    case "CHANGE_WORD":
      return action.payload;
    case "RESET_WORD":
      return action.payload;
    default:
      return state;
  }
};
