import axios from "axios";
import { Dispatch } from "redux";
import { WordActionTypes } from "../../types/word";
import { IwordAction } from "../../types/word";

export const fetchWord = (labelWord:string) => {
  return async (dispatch: Dispatch<IwordAction>) => {
    try {
      const response = await axios.get(
        "https://api.dictionaryapi.dev/api/v2/entries/en/" + labelWord.toLowerCase()
      );
      dispatch({
        type: WordActionTypes.NEW_WORD,
        payload: { word: response.data[0].word, transcription: response.data[0].phonetic,
            meaning: response.data[0].meanings[0].definitions[0].definition,
            example: response.data[0].meanings[0].definitions[0].example,
            audioURL: response.data[0].phonetics[0].audio },
      });
    } catch (e) {
    //   dispatch({ type: WordActionTypes.ERROR_WORD });
    }
  };
};
