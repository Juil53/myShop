import { put, takeEvery } from "redux-saga/effects";
import { CART_ACTIONS } from "../../constants";
import localStorage from "../../service/localStorage";
import { actions } from "./slice";

export function* fetchCart() {
  yield put(actions.fetchCartRequest());

  try {
    const cart = localStorage.get("cart");
    yield put(actions.fetchCartSuccess(cart));
  } catch (err) {
    console.log(err);
    yield put(actions.fetchCartFail());
  }
}

export default function* root() {
  yield takeEvery(CART_ACTIONS.GET_CART, fetchCart);
}
