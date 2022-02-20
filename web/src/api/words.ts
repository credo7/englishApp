import { api } from "./api";

export const getWords = async () => {
  const data = await api.get("words/get").then((res) => res.data);
  return data;
};

export const addWord = async (word: string) => {
  await api.post("words/add", { word });
  return;
};
