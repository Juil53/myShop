import { call, put, takeEvery } from "redux-saga/effects";

import { PRODUCT_ACTIONS } from "../../constants";
import { actions } from "./slice";
import API from "../../service";

export function* fetchHotProducts() {
  yield put(actions.fetchHotProductsRequest());

  try {
    const result = yield call(API.get, { path: "products" });
    if (!result) {
      throw { msg: "Failed to load hot product" };
    }
    let data = [];

    for (let i = 0; i < result.length; i++) {
      if (result[i].isHot) {
        data.push(result[i]);
      }
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
    const result = yield call(API.get, { path: "products" });
    if (!result) {
      throw { msg: "Failed to load new product" };
    }

    let data = [];

    for (let i = 0; i < result.length; i++) {
      if (result[i].isNew) {
        data.push(result[i]);
      }
    }
    yield put(actions.fetchNewProductsSuccess(data));
  } catch (err) {
    console.log(err);
    yield put(actions.fetchNewProductsFail());
  }
}

export function* fetchBestSellProducts() {
  yield put(actions.fetchBestSellingRequest());

  try {
    const result = yield call(API.get, { path: "products" });
    if (!result) {
      throw { msg: "Get best selling product failed" };
    }
    let data = [];

    for (let i = 0; i < result.length; i++) {
      if (result[i].sold > 10) {
        data.push(result[i]);
      }
    }

    yield put(actions.fetchBestSellingSuccess(data));
  } catch (err) {
    console.log(err);
    yield put(actions.fetchBestSellingFail());
  }
}

export default function* root() {
  yield takeEvery(PRODUCT_ACTIONS.GET_HOT_PRODUCTS, fetchHotProducts);
  yield takeEvery(PRODUCT_ACTIONS.GET_ALL_PRODUCTS, fetchAllProducts);
  yield takeEvery(PRODUCT_ACTIONS.GET_NEW_PRODUCTS, fetchNewProducts);
  yield takeEvery(
    PRODUCT_ACTIONS.GET_BEST_SELLING_PRODUCTS,
    fetchBestSellProducts
  );
}
