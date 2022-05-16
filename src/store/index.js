// import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
// import thunk from "redux-thunk";
import { languages } from "./languages/reducer";

import usersReducer from "./users/usersSlice";
import categories from "./categories/slice";
import products from "./products/slice";
import page from "./page/slice";

import saga from "./saga";

let sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: {
    products,
    languages,
    categories,
    user: usersReducer,
    page,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(saga);
