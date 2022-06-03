import { put, take, takeEvery } from "redux-saga/effects";
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

export function* addCart(data) {
  if (!data) return;
  const { cart } = data;

  try {
    localStorage.set("cart", cart);
    yield put(actions.fetchAddCart(cart));
  } catch (err) {
    console.log(err);
  }
}

export function* deleteCart() {
  try {
    localStorage.remove("cart");
    yield put(actions.fetchDeleteCart());
  } catch (err) {
    console.log(err);
  }
}

export default function* root() {
  yield takeEvery(CART_ACTIONS.GET_CART, fetchCart);
  yield takeEvery(CART_ACTIONS.ADD_CART, addCart);
  yield takeEvery(CART_ACTIONS.DELETE_CART, deleteCart);
}
