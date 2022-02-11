import { combineReducers } from "@reduxjs/toolkit";
import { wordReducer } from "./wordReducer";

export const rootReducer = combineReducers({ word: wordReducer });

export type RootState = ReturnType<typeof rootReducer>;
