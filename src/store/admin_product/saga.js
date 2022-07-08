import { call, put, takeEvery } from "redux-saga/effects";
import { ROWS_PER_PAGE } from "../../constants";
import apiInstance from "../../utils/axios/axiosInstance";
import {
  deleteProductFailed, deleteProductSuccess,
  getAllProductFailed,
  getAllProductSuccess,
  getCategoriesFailed,
  getCategoriesSuccess,
  getOptionsFailed,
  getOptionsSuccess,
  getProductPaginationFailed,
  getProductPaginationSuccess,
  submitProductFailed,
  submitProductSuccess
} from "./productSlice";

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
    const result = yield call(apiInstance.get, "products");
    yield put(getAllProductSuccess(result));
  } catch (err) {
    yield put(getAllProductFailed());
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
  console.log("action",action)
  try {
    yield call(apiInstance.delete, `products/${action.payload}`);
    yield put(deleteProductSuccess())
  } catch (err) {
    yield put(deleteProductFailed())
  }
}

export default function* adminProductSaga() {
  yield takeEvery("product/getAllProductRequest", actGetAllProduct);
  yield takeEvery("product/getProductPaginationRequest", actProductPagination);
  yield takeEvery("product/submitProductRequest", actAddProduct);
  yield takeEvery("product/getOptionsRequest", actGetOptions);
  yield takeEvery("product/getCategoriesRequest", actGetCategories);
  yield takeEvery("product/deleteProductRequest", actDeleteProduct);
}
