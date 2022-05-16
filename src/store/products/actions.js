import { createAsyncThunk } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";

import { PRODUCT_ACTIONS } from "../../constants";
import { actions } from "./slice";
import API from "../../service";

export function* fetchHotProducts() {
  yield put(actions.fetchHotProductsRequest());

  try {
    const data = yield call(API.get, { path: "hot_products" });
    yield put(actions.fetchHotProductsSuccess(data));
  } catch (err) {
    yield put(actions.fetchHotProductsFail());
  }
}

export function* fetchAllProducts() {
  yield put(actions.fetchAllProductsRequest());

  try {
    const data = yield call(API.get, { path: "products" });
    yield put(actions.fetchAllProductsSuccess(data));
  } catch (err) {
    yield put(actions.fetchAllProductsFail());
  }
}

export default function* root() {
  yield takeEvery(PRODUCT_ACTIONS.GET_HOT_PRODUCTS, fetchHotProducts);
  yield takeEvery(PRODUCT_ACTIONS.GET_ALL_PRODUCTS, fetchAllProducts);
}
