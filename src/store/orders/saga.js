import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import apiInstance from "../../utils/axios/axiosInstance";
import APIv1 from "../../service";
import {
  addOrderFail,
  addOrderSuccess,
  deleteOrderFailed,
  deleteOrderSuccess,
  getOrderFailed,
  getOrderPaginationFailed,
  getOrderPaginationSuccess,
  getOrderSuccess,
  submitOrderFailed,
  submitOrderSuccess,
  getPayUrlFail,
  getPayUrlSuccess,
  getOrderDetailSuccess,
  getOrderDetailFailed,
} from "./orderSlice";
import localStorage from "../../service/localStorage";
import { actions as cartActions } from "../cart/slice";
import { toast } from "react-toastify";
import fb from "../../service/db";

//GET ORDERS DATA
export function* actGetOrders() {
  try {
    const result = yield call(fb.getAll, "orders");
    yield put(getOrderSuccess(result));
  } catch (error) {
    yield put(getOrderFailed(error));
  }
}

//GET ORDERS DATA
export function* actGetOrder(action) {
  try {
    const result = yield call(fb.get, "orders",action.payload.id);
    yield put(getOrderDetailSuccess(result));
  } catch (error) {
    yield put(getOrderDetailFailed(error));
  }
}

//GET ORDER DATA PAGINATION
export function* actGetOrderPagination(action) {
  const { page, ROWS_PER_PAGE } = action.payload;
  try {
    const result = yield call(apiInstance.get, `orders?_page=${page}&_limit=${ROWS_PER_PAGE}`);
    yield put(getOrderPaginationSuccess(result));
  } catch (err) {
    yield put(getOrderPaginationFailed(err));
  }
}

// UPDATE ORDER STATUS
export function* actUpdateOrderStatus(action) {
  try {
    const result = yield call(fb.update, `orders/${action.payload.id}`, action.payload);
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

// get payUrl

export function* getPayUrl({ payload: { amount, orderId } }) {
  try {
    const { payUrl } = yield call(APIv1.post, {
      baseUrl: "http://192.168.1.143:3002/api/payment",
      query: {
        amount,
        orderId,
      },
    });

    if (payUrl) {
      yield put(getPayUrlSuccess({ payUrl }));
    } else {
      yield put(getPayUrlFail());
    }
  } catch (err) {
    yield put(getPayUrlFail());
  }
}

//add order
export function* addOrder({ payload: { order, orderId, encryptedId } }) {
  const { success } = yield call(APIv1.post, {
    baseUrl: "http://192.168.1.143:3002/api/orders",
    query: { orderId, encryptedId, order },
  });

  if (success) {
    localStorage.remove("cart");
    yield put(cartActions.clearCart());

    yield put(addOrderSuccess());

    yield call(toast.success, "Order successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    yield call(toast.warning, "Order fail!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    yield put(addOrderFail());
  }
}

export default function* adminOrderSaga() {
  yield takeEvery("order/getOrderRequest", actGetOrders);
  yield takeEvery("order/getOrderDetailRequest", actGetOrder);
  yield takeEvery("order/getOrderPaginationRequest", actGetOrderPagination);
  yield takeEvery("order/updateOrderDetail", actUpdateOrderStatus);
  yield takeEvery("order/deleteOrderRequest", actDeleteOrder);
  yield takeEvery("order/addOrderRequest", addOrder);
  yield takeLatest("order/getPayUrlRequest", getPayUrl);
}
