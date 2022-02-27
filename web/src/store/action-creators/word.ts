import axios from "axios";
import { wordStructure } from "../../types/word";

const wordChange = (data: wordStructure) => {
  return { type: "CHANGE_WORD", payload: data };
};

export const fetchWord = (word: string) => (dispatch: any) => {
  axios
    .get(
      "https://api.dictionaryapi.dev/api/v2/entries/en/" + word.toLowerCase()
    )
    .then((response) => {
      dispatch(
        wordChange({
          word: response.data[0].word,
          transcription: response.data[0].phonetic,
          meaning: response.data[0].meanings[0].definitions[0].definition,
          example: response.data[0].meanings[0].definitions[0].example,
          audioURL: response.data[0].phonetics[0].audio,
        })
      );
    });
};
