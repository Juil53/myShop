import { all, call, put, takeEvery } from "redux-saga/effects";
import { ROWS_PER_PAGE } from "../../constants";
import apiInstance from "../../utils/axios/axiosInstance";
import {
  deleteProductFailed,
  deleteProductSuccess,
  deleteSelectedProductFailed,
  deleteSelectedProductSuccess,
  getAllProductFailed,
  getAllProductSuccess,
  getCategoriesFailed,
  getCategoriesSuccess,
  getOptionsFailed,
  getOptionsSuccess,
  getProductPaginationFailed,
  getProductPaginationSuccess,
  submitProductFailed,
  submitProductSuccess,
} from "./productSlice";
import fb from "../../service/db";

//GET OPTIONS
export function* actGetOptions() {
  try {
    const result = yield call(apiInstance.get, "options");
    yield put(getOptionsSuccess(result));
  } catch (err) {
    yield put(getOptionsFailed(err));
  }
}

//GET CATEGORIES
export function* actGetCategories() {
  try {
    const result = yield call(apiInstance.get, "categories");
    yield put(getCategoriesSuccess(result));
  } catch (err) {
    yield put(getCategoriesFailed(err));
  }
}

//ADD PRODUCT
export function* actAddProduct(action) {
  const { values } = action.payload;
  try {
    const result = yield call(apiInstance.post, "products", action.payload);
    yield put(submitProductSuccess(result));
  } catch (err) {
    yield put(submitProductFailed());
  }
}

// GET PRODUCT
export function* actGetAllProduct() {
  try {
    const result = yield call(fb.getAll, "products");
    yield put(getAllProductSuccess(result));
  } catch (error) {
    yield put(getAllProductFailed(error));
  }
}

// GET PRODUCT DATA PAGINATION
export function* actProductPagination(action) {
  const { page } = action.payload;
  try {
    const result = yield call(apiInstance.get, `products?_page=${page}&_limit=${ROWS_PER_PAGE}`);
    yield put(getProductPaginationSuccess(result));
  } catch (err) {
    yield put(getProductPaginationFailed(err));
  }
}

// DELETE PRODUCT
export function* actDeleteProduct(action) {
  try {
    const result = yield call(fb.del("products", action.payload));
    yield put(deleteProductSuccess(result));
  } catch (err) {
    yield put(deleteProductFailed());
  }
}

// DELETE SELECTED PRODUCTS
export function* actDeleteSelectedProduct(action) {
  const ids = action.payload;
  try {
    yield all([ids.map((id) => call(fb.del("products", id)))]);
    yield put(deleteSelectedProductSuccess());
  } catch (err) {
    yield put(deleteSelectedProductFailed());
  }
}

export default function* adminProductSaga() {
  yield takeEvery("product/getAllProductRequest", actGetAllProduct);
  yield takeEvery("product/getProductPaginationRequest", actProductPagination);
  yield takeEvery("product/submitProductRequest", actAddProduct);
  yield takeEvery("product/getOptionsRequest", actGetOptions);
  yield takeEvery("product/getCategoriesRequest", actGetCategories);
  yield takeEvery("product/deleteProductRequest", actDeleteProduct);
  yield takeEvery("product/deleteSelectedProductRequest", actDeleteSelectedProduct);
}
