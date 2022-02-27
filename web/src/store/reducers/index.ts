import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./authReducer";
import { currentWordReducer } from "./currentWordReducer";
import { wordPanelReducer } from "./wordPanelReducer";

export const rootReducer = combineReducers({
  isAuth: authReducer,
  currentWord: currentWordReducer,
  isVisibleWordPanel: wordPanelReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
