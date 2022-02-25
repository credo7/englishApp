import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./authReducer";
import { wordReducer } from "./wordReducer";

export const rootReducer = combineReducers({
  word: wordReducer,
  isAuth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
