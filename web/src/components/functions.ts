import axios from "axios";

interface Word {
  word: string;
  transcription: string;
  meaning: string;
  example: string;
  audioURL: string;
}

export const capitalizeFirstLetter = (word: string) => {
  return word.replace(/^\w/, (c: string) => c.toUpperCase());
};

export const findWord = async (word: string): Promise<Word> => {
  const response = await axios.get(
    "https://api.dictionaryapi.dev/api/v2/entries/en/" + word.toLowerCase()
  );
  return {
    word: response.data[0].word,
    transcription: response.data[0].phonetic,
    meaning: response.data[0].meanings[0].definitions[0].definition,
    example: response.data[0].meanings[0].definitions[0].example,
    audioURL: response.data[0].phonetics[0].audio,
  };
};
