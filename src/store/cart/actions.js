import { call, put, takeEvery } from "redux-saga/effects";

import localStorage from "../../service/localStorage";
import { CART_ACTIONS } from "../../constants";
import API from "../../service";
import APIv2 from "../../service/db";
import { actions } from "./slice";
import { utils } from "../../utils";
import { handleUpdateCart } from "./help";
import { getUserId } from "../../utils/auth";

export function* getCart() {
  yield put(actions.fetchCartRequest());

  try {
    const cart = localStorage.get("cart");
    const token = localStorage.get("token");

    if (token) {
      const uid = getUserId();
      //const kq = yield call(API.get, { path: `carts/cart${uid}` });
      const kq = yield call(APIv2.get, "carts", `cart${uid}`);

      if (kq) {
        const newCart = {
          totalAmount: 0,
          productList: [],
        };
        if (!cart) {
          newCart.totalAmount = kq.totalAmount;
          newCart.productList = [...kq.productList];

          localStorage.set("cart", newCart);
        } else {
          const productLocal = [...cart.productList];
          const productData = [...kq.productList];

          productData.forEach((v) => {
            const sameProduct = productLocal.filter((p) => p.id === v.id);

            if (sameProduct.length > 0) {
              const sameOption = sameProduct.filter(
                (p) =>
                  JSON.stringify(p.optionSelected) ===
                  JSON.stringify(v.optionSelected)
              );

              if (sameOption.length === 0) {
                productLocal.push(v);
              }
            } else {
              productLocal.push(v);
            }
          });
          kq.productList = [...productLocal];
          kq.totalAmount = utils.calTotal(cart);
          newCart.productList = [...productLocal];
          newCart.totalAmount = kq.totalAmount;

          console.log(kq);
          //yield call(API.put, { path: `carts/${kq.id}`, query: kq });
          yield call(APIv2.update, "carts", kq, `cart${uid}`);
          localStorage.set("cart", newCart);
        }
        yield put(actions.fetchCartSuccess(newCart));
      } else {
        const uid = getUserId();

        if (cart) {
          const newCart = {
            uid: uid,
            productList: cart.productList,
            totalAmount: cart.totalAmount,
          };

          //yield call(API.post, { path: "carts", query: newCart });
          yield call(APIv2.set, "carts", `cart${uid}`, newCart);
          yield put(actions.fetchCartSuccess(newCart));
        }
      }
    } else if (cart) {
      yield put(actions.fetchCartSuccess(cart));
    }
  } catch (err) {
    yield put(actions.fetchCartFail());
  }
}

export function* addCart({ product }) {
  try {
    yield put(actions.fetchAddCart({ product }));
  } catch (err) {}
}

export function* updateCart({ product }) {
  yield put(actions.updateCartRequest());

  try {
    const token = localStorage.get("token");
    const cart = localStorage.get("cart");

    if (token) {
      const uid = getUserId();
      //const rs = yield call(API.get, { path: `carts/cart${uid}` });
      const rs = yield call(APIv2.get, "carts", `cart${uid}`);
      const newCart = handleUpdateCart(cart, { product });

      rs.totalAmount = newCart.totalAmount;
      rs.productList = newCart.productList;

      //      yield call(API.put, { path: `carts/cart${uid}`, query: rs });
      yield call(APIv2.update, "carts", rs, `cart${uid}`);
    }
    yield put(actions.updateCart({ product }));
  } catch (e) {}
}

export default function* root() {
  yield takeEvery(CART_ACTIONS.GET_CART, getCart);
  yield takeEvery(CART_ACTIONS.ADD_CART, addCart);
  yield takeEvery(CART_ACTIONS.UPDATE_CART, updateCart);
}
