export interface wordAction {
  type: string;
  payload: wordStructure;
}
export interface wordStructure {
  word: string;
  transcription: string;
  meaning: string;
  example: string;
  audioURL: string;
}
