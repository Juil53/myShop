import { combineReducers,applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import { popup } from "./popup/reducer";
import { products } from "./products/reducer";
import { languages } from "./languages/reducer";
import { categories } from "./categories/reducer";

import usersReducer from "./users/usersSlice";

const rootReducer = combineReducers({
  popup,
  products,
  languages,
  categories,
  user: usersReducer,
});

export const store = configureStore({reducer:rootReducer}, applyMiddleware(thunk));

