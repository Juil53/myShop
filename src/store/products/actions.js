import { call, put, takeEvery } from "redux-saga/effects";

import { PRODUCT_ACTIONS } from "../../constants";
import { removeAccents } from "../../utils";
import { actions } from "./slice";
import APIv2 from "../../service/db";
import apiInstance from "../../utils/axios/axiosInstance";

export function* fetchHotProducts() {
  yield put(actions.fetchHotProductsRequest());

  try {
    const result = yield call(APIv2.getAll, "products");

    if (!result || result.length <= 0) {
      yield put(actions.fetchHotProductsFail());
    } else {
      let data = [];

      for (let i = 0; i < result.length; i++) {
        if (result[i].isHot) {
          data.push(result[i]);
        }
      }

      yield put(actions.fetchHotProductsSuccess(data));
    }
  } catch (err) {
    yield put(actions.fetchHotProductsFail());
  }
}

export function* fetchAllProducts() {
  yield put(actions.fetchAllProductsRequest());

  try {
    const data = yield call(APIv2.getAll, "products");

    if (!data || data.length <= 0) {
      yield put(actions.fetchAllProductsFail());
    } else {
      yield put(actions.fetchAllProductsSuccess(data));
    }
  } catch (err) {
    yield put(actions.fetchAllProductsFail());
  }
}

export function* getProduct(action) {
  try {
    const result = yield call(apiInstance.get, `products/${action.payload}`);
    yield put(actions.getProductSuccess(result));
  } catch (err) {
    yield put(actions.getProductFailed(err));
  }
}

export function* fetchNewProducts() {
  yield put(actions.fetchNewProductsRequest());

  try {
    const result = yield call(APIv2.getAll, "products");

    if (!result || result.length <= 0) {
      yield put(actions.fetchNewProductsFail());
    } else {
      const data = [];

      for (let i = 0; i < result.length; i++) {
        if (result[i].isNew) {
          data.push(result[i]);
        }
      }

      yield put(actions.fetchNewProductsSuccess(data));
    }
  } catch (err) {
    yield put(actions.fetchNewProductsFail());
  }
}

export function* fetchBestSellProducts() {
  yield put(actions.fetchBestSellingRequest());

  try {
    const result = yield call(APIv2.getAll, "products");

    if (!result || result.length <= 0) {
      yield put(actions.fetchBestSellingFail());
    } else {
      const data = result.filter((v) => v.sold > 10);

      yield put(actions.fetchBestSellingSuccess(data));
    }
  } catch (err) {
    yield put(actions.fetchBestSellingFail());
  }
}

export function* searchProduct({ name }) {
  yield put(actions.searchProductRequest());

  try {
    const result = yield call(APIv2.getAll, "products");

    if (!result || result.length <= 0) {
      yield put(actions.searchProductFail());
    } else {
      const nameSearch = removeAccents(name.toLowerCase());

      let data = result.filter((v) =>
        removeAccents(v.name.toLowerCase()).includes(nameSearch)
      );
      console.log(data);

      yield put(actions.searchProductSuccess(data));
    }
  } catch (err) {
    yield put(actions.searchProductFail());
  }
}

export default function* root() {
  yield takeEvery(PRODUCT_ACTIONS.SEARCH_PRODUCT, searchProduct);
  yield takeEvery(PRODUCT_ACTIONS.GET_HOT_PRODUCTS, fetchHotProducts);
  yield takeEvery(PRODUCT_ACTIONS.GET_ALL_PRODUCTS, fetchAllProducts);
  yield takeEvery(PRODUCT_ACTIONS.GET_NEW_PRODUCTS, fetchNewProducts);
  yield takeEvery(
    PRODUCT_ACTIONS.GET_BEST_SELLING_PRODUCTS,
    fetchBestSellProducts
  );
  yield takeEvery("product/getProductRequest", getProduct);
}
