// import { combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { languages } from "./languages/reducer";
import createSagaMiddleware from "redux-saga";

import orderReducer from "./orders/orderSlice"
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
    page,
    user: usersReducer,
    order:orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(saga);
