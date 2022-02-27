import { wordAction, wordStructure } from "../../types/word";

const initialState:wordStructure = {
word:'hello',
transcription:'lol',
meaning:'first calling word',
example:'hello my friend',
audioURL:'http/123'
}

export const currentWordReducer = (state = initialState, action: wordAction) => {
  switch (action.type) {
    case "CHANGE_WORD":
      return action.payload;
    case "RESET_WORD":
        return action.payload
    default:
      return state;
  }
};
