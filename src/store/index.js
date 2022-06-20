// import { combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { languages } from "./languages/reducer";
import createSagaMiddleware from "redux-saga";

import orderReducer from "./orders/orderSlice";
import usersReducer from "./users/usersSlice";
import productReducer from "./admin_product/productSlice";

import categories from "./categories/slice";
import products from "./products/slice";
import page from "./page/slice";
import cart from "./cart/slice";
import client from "./clients/slice";
import rootSaga from "./saga";

let sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    products,
    languages,
    categories,
    page,
    cart,
    client,
    user: usersReducer,
    order: orderReducer,
    adminProduct: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
