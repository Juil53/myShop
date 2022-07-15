import { call, put, takeEvery } from "redux-saga/effects";

import apiInstance from "../../utils/axios/axiosInstance";
import APIv2 from "../../service/db";
import {
  addOrderFail,
  addOrderSuccess,
  deleteOrderFailed,
  deleteOrderSuccess,
  getOrderFailed,
  getOrderPaginationFailed,
  getOrderPaginationSuccess,
  getOrderSuccess,
  resetStatus,
  submitOrderFailed,
  submitOrderSuccess,
} from "./orderSlice";
import localStorage from "../../service/localStorage";
import { actions as cartActions } from "../cart/slice";

//GET ORDER DATA
export function* actGetOrder() {
  try {
    const result = yield call(apiInstance.get, "orders");
    yield put(getOrderSuccess(result));
  } catch (err) {
    yield put(getOrderFailed(err));
  }
}

//GET ORDER DATA PAGINATION
export function* actGetOrderPagination(action) {
  const { page, ROWS_PER_PAGE } = action.payload;
  try {
    const result = yield call(
      apiInstance.get,
      `orders?_page=${page}&_limit=${ROWS_PER_PAGE}`
    );
    yield put(getOrderPaginationSuccess(result));
  } catch (err) {
    yield put(getOrderPaginationFailed(err));
  }
}

// UPDATE ORDER STATUS
export function* actUpdateOrderStatus(action) {
  try {
    const result = yield call(
      apiInstance.put,
      `orders/${action.payload.id}`,
      action.payload
    );
    yield put(submitOrderSuccess(result));
  } catch (err) {
    yield put(submitOrderFailed(err));
  }
}

// DELETE ORDER
export function* actDeleteOrder(action) {
  try {
    yield call(apiInstance.delete, `orders/${action.payload}`);
    yield put(deleteOrderSuccess());
  } catch (err) {
    yield put(deleteOrderFailed(err));
  }
}

//add order
export function* addOrder({ payload: { order } }) {
  console.log("call add order");

  const rs = yield call(APIv2.add, "orders", order);

  if (rs) {
    if (order.uid) {
      yield call(APIv2.del, "carts", `cart${order.uid}`);
    }

    localStorage.remove("cart");
    yield put(cartActions.clearCart());

    yield put(addOrderSuccess());
  } else {
    yield put(addOrderFail());
  }
}

export default function* adminOrderSaga() {
  yield takeEvery("order/getOrderRequest", actGetOrder);
  yield takeEvery("order/getOrderPaginationRequest", actGetOrderPagination);
  yield takeEvery("order/updateOrderDetail", actUpdateOrderStatus);
  yield takeEvery("order/deleteOrderRequest", actDeleteOrder);
  yield takeEvery("order/addOrderRequest", addOrder);
}
