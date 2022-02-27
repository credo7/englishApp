import axios from "axios";
import { wordStructure } from "../../types/word";
import { invisible, visible } from "./wordInformationPanel";

const wordChange = (data: wordStructure) => {
  return { type: "CHANGE_WORD", payload: data };
};

export const fetchWord = (word: string) => (dispatch: any) => {
  if (word == "") return;
  axios
    .get(
      "https://api.dictionaryapi.dev/api/v2/entries/en/" + word.toLowerCase()
    )
    .then((response) => {
      dispatch(
        wordChange({
          word: response.data[0].word || "Word not found",
          transcription: response.data[0].phonetic || "Transcription not found",
          meaning:
            response.data[0].meanings[0].definitions[0].definition ||
            "Meaning not found",
          example:
            response.data[0].meanings[0].definitions[0].example ||
            "Example not found",
          audioURL: response.data[0].phonetics[0].audio || "error",
        })
      );
    })
    .then(() => dispatch(visible()))
    .catch((e) => {
      dispatch(invisible());
      alert("Word not found or error with API");
    });
};
