import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import apiInstance from "../../utils/axios/axiosInstance";
import APIv1 from "../../service";
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
  submitOrderFailed,
  submitOrderSuccess,
  getPayUrlFail,
  getPayUrlSuccess,
  getOrderByClientSuccess,
  getOrderByClientFail,
  getOrderByIdFail,
  getOrderByIdSuccess,
} from "./orderSlice";
import localStorage from "../../service/localStorage";
import { actions as cartActions } from "../cart/slice";
import { toast } from "react-toastify";
import { getUserId } from "../../utils/decode";

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

export function* getOrderByClient() {
  try {
    const token = localStorage.get("token");

    if (token) {
      const uid = getUserId("token");
      if (uid) {
        const orders = yield call(APIv2.getAll, "orders");

        if (orders) {
          const rs = orders.filter((v) => v.uid === uid);

          yield put(getOrderByClientSuccess(rs));
        }
      } else {
        yield put(getOrderByClientFail("No sign in"));
      }
    } else {
      yield put(getOrderByClientFail("No sign in"));
    }
  } catch (err) {
    yield put(getOrderByClientFail());
  }
}

export function* getOrderById({ payload: { id } }) {
  try {
    const rs = yield call(APIv2.get, "orders", id);
    if (rs) {
      yield put(getOrderByIdSuccess(rs));
    }
  } catch (err) {
    yield put(getOrderByIdFail());
  }
}

export default function* adminOrderSaga() {
  yield takeEvery("order/getOrderRequest", actGetOrder);
  yield takeEvery("order/getOrderPaginationRequest", actGetOrderPagination);
  yield takeEvery("order/updateOrderDetail", actUpdateOrderStatus);
  yield takeEvery("order/deleteOrderRequest", actDeleteOrder);
  yield takeEvery("order/addOrderRequest", addOrder);
  yield takeLatest("order/getPayUrlRequest", getPayUrl);
  yield takeEvery("order/getOrderByClientRequest", getOrderByClient);
  yield takeEvery("order/getOrderByIdRequest", getOrderById);
}
