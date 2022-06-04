import { put, takeEvery } from "redux-saga/effects";

import localStorage from "../../service/localStorage";
import { CART_ACTIONS } from "../../constants";
import { actions } from "./slice";

export function* getCart() {
  yield put(actions.fetchCartRequest());

  try {
    const cart = localStorage.get("cart");
    if (cart) {
      yield put(actions.fetchCartSuccess(cart));
    }
  } catch (err) {
    console.log(err);
    yield put(actions.fetchCartFail());
  }
}

export function* addCart({ product }) {
  try {
    yield put(actions.fetchAddCart({ product }));
  } catch (err) {
    console.log(err);
  }
}

export function* updateCart({ product, quantity }) {
  try {
    yield put(actions.updateCart({ product, quantity }));
  } catch (e) {
    console.log(e);
  }
}

export default function* root() {
  yield takeEvery(CART_ACTIONS.GET_CART, getCart);
  yield takeEvery(CART_ACTIONS.ADD_CART, addCart);
  yield takeEvery(CART_ACTIONS.UPDATE_CART, updateCart);
}
