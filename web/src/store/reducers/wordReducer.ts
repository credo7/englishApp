import { IwordAction, WordActionTypes, IwordState } from "../../types/word";

const initialState: IwordState = {
  word: "sample",
  transcription: "хэллоу",
  meaning: "it is sample",
  example: "sample example",
  audioURL: "",
};

export const wordReducer = (
  state = initialState,
  action: IwordAction
): IwordState => {
  switch (action.type) {
    case WordActionTypes.NEW_WORD: {
      return {
        word: action.payload.word,
        transcription: action.payload.transcription,
        meaning: action.payload.meaning,
        example: action.payload.example,
        audioURL: action.payload.audioURL,
      };
    }
    default:
      return state;
  }
};
