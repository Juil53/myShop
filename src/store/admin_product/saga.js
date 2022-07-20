import { all, call, put, takeEvery } from "redux-saga/effects";
import fb from "../../service/db";
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
  getProductInfoFailed,
  getProductInfoSuccess, submitProductFailed,
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
  try {
    const result = yield call(apiInstance.post, "products", action.payload);
    yield put(submitProductSuccess(result));
  } catch (err) {
    yield put(submitProductFailed());
  }
}

// GET PRODUCTS
export function* actGetAllProduct() {
  try {
    const result = yield call(fb.getAll, "products");
    yield put(getAllProductSuccess(result));
  } catch (error) {
    yield put(getAllProductFailed(error));
  }
}

// GET PRODUCTS
export function* actGetProduct(action) {
  try {
    const result = yield call(fb.get, "products",action.payload);
    yield put(getProductInfoSuccess(result));
  } catch (error) {
    yield put(getProductInfoFailed(error));
  }
}

// GET PRODUCT DATA PAGINATION
// export function* actProductPagination(action) {
//   const { page } = action.payload;
//   try {
//     const result = yield call(apiInstance.get, `products?_page=${page}&_limit=${ROWS_PER_PAGE}`);
//     yield put(getProductPaginationSuccess(result));
//   } catch (err) {
//     yield put(getProductPaginationFailed(err));
//   }
// }

// DELETE PRODUCT
export function* actDeleteProduct(action) {
  try {
    const result = yield call(fb.del("products", action.payload));
    yield put(deleteProductSuccess(result));
  } catch (err) {
    console.log(err)
    yield put(deleteProductFailed(err));
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
  // yield takeEvery("product/getProductPaginationRequest", actProductPagination);
  yield takeEvery("product/getAllProductRequest", actGetAllProduct);
  yield takeEvery("product/getProductInfoRequest", actGetProduct);
  yield takeEvery("product/submitProductRequest", actAddProduct);
  yield takeEvery("product/getOptionsRequest", actGetOptions);
  yield takeEvery("product/getCategoriesRequest", actGetCategories);
  yield takeEvery("product/deleteProductRequest", actDeleteProduct);
  yield takeEvery("product/deleteSelectedProductRequest", actDeleteSelectedProduct);

}
