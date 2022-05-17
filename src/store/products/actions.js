import { createAsyncThunk } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";

import { PRODUCT_ACTIONS } from "../../constants";
import { actions } from "./slice";
import API from "../../service";

export function* fetchHotProducts() {
  yield put(actions.fetchHotProductsRequest());

  try {
    const data = yield call(API.get, { path: "hot_products" });
    if (!data) {
      throw { msg: "Failed to load hot product" };
    }
    yield put(actions.fetchHotProductsSuccess(data));
  } catch (err) {
    console.log(err);
    yield put(actions.fetchHotProductsFail());
  }
}

export function* fetchAllProducts() {
  yield put(actions.fetchAllProductsRequest());

  try {
    const data = yield call(API.get, { path: "products" });
    if (!data) {
      throw { msg: "Failed to load all product" };
    }
    yield put(actions.fetchAllProductsSuccess(data));
  } catch (err) {
    console.log(err);
    yield put(actions.fetchAllProductsFail());
  }
}

export function* fetchNewProducts() {
  yield put(actions.fetchNewProductsRequest());

  try {
    const data = yield call(API.get, { path: "new_products" });
    if (!data) {
      throw { msg: "Failed to load new product" };
    }
    yield put(actions.fetchNewProductsSuccess(data));
  } catch (err) {
    console.log(err);
    yield put(actions.fetchNewProductsFail());
  }
}

export default function* root() {
  yield takeEvery(PRODUCT_ACTIONS.GET_HOT_PRODUCTS, fetchHotProducts);
  yield takeEvery(PRODUCT_ACTIONS.GET_ALL_PRODUCTS, fetchAllProducts);
  yield takeEvery(PRODUCT_ACTIONS.GET_NEW_PRODUCTS, fetchNewProducts);
}
