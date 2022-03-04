import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./authReducer";
import { currentWordReducer } from "./currentWordReducer";
import { modalReducer } from "./modalReducer";
import { wordPanelReducer } from "./wordPanelReducer";

export const rootReducer = combineReducers({
  isAuth: authReducer,
  currentWord: currentWordReducer,
  isVisibleWordPanel: wordPanelReducer,
  modal: modalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
