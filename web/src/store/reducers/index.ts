import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./authReducer";
import { currentWordReducer } from "./currentWordReducer";

export const rootReducer = combineReducers({
  isAuth: authReducer,
  currentWord: currentWordReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
