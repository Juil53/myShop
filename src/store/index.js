import { combineReducers,applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import { popup } from "./popup/reducer";
import { languages } from "./languages/reducer";

import usersReducer from "./users/usersSlice";
import categoriesSlice from "./categories/slice";
import productSlice from "./products/slice";


const rootReducer = combineReducers({
  popup,
  products: productSlice,
  languages,
  categories: categoriesSlice,
  user: usersReducer,
});

export const store = configureStore(
  { reducer: rootReducer },
  applyMiddleware(thunk)
);
