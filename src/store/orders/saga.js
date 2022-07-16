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
  submitOrderFailed,
  submitOrderSuccess,
} from "./orderSlice";
import localStorage from "../../service/localStorage";
import { actions as cartActions } from "../cart/slice";
import { toast } from "react-toastify";

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
  const rs = yield call(APIv2.add, "orders", order);

  if (rs) {
    if (order.uid) {
      yield call(APIv2.del, "carts", `cart${order.uid}`);
    }

    //decrease product quantity
    const products = [...order.items];

    for (let i = 0; i < products.length; i++) {
      const updatedProduct = {};
      console.log(products[i].id);

      if (
        products[i].optionSelected &&
        Object.keys(products[i].optionSelected).length > 0
      ) {
        //product has option
        const product = yield call(APIv2.get, "products", products[i].id);

        //update quantity of selected option
        const configurableProducts = [...product.configurableProducts];
        const newConfigurableProducts = [];

        configurableProducts.forEach((v) => {
          const { available, selected, ...others } = v;

          if (
            JSON.stringify(others) ===
            JSON.stringify(products[i].optionSelected)
          ) {
            const updatedConfigurableProduct = {
              available: available - products[i].quantity,
              ...others,
            };
            if (selected) {
              updatedConfigurableProduct.selected = true;
            }
            newConfigurableProducts.push(updatedConfigurableProduct);
          } else {
            newConfigurableProducts.push(v);
          }
        });

        updatedProduct.configurableProducts = [...newConfigurableProducts];
        updatedProduct.available = product.available - products[i].quantity;
      } else {
        updatedProduct.available = products[i].available - products[i].quantity;
      }

      yield call(APIv2.update, "products", updatedProduct, products[i].id);
    }

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
