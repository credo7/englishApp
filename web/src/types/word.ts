export enum WordActionTypes {
  NEW_WORD = "NEW_WORD",
  ERROR_WORD = "ERROR_WORD",
}

export interface IwordState {
  word: string;
  transcription: string;
  meaning: string;
  example: string;
  audioURL: string;
}

export interface IwordAction {
  type: string;
  payload: IwordState;
}
