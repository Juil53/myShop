import { call, put, takeEvery } from "redux-saga/effects";

import localStorage from "../../service/localStorage";
import APIv2 from "../../service/db";
import { actions } from "./slice";
import { utils } from "../../utils";
import { handleAddCart, handleUpdateCart } from "./help";
import { getUserId } from "../../utils/auth";

export function* getCart() {
  try {
    const cart = localStorage.get("cart");
    const token = localStorage.get("token");

    //signed in
    if (token) {
      const uid = getUserId();
      const kq = yield call(APIv2.get, "carts", `cart${uid}`);

      //client has firestore cart
      if (kq) {
        const newCart = {
          totalAmount: 0,
          productList: [],
        };

        if (!cart) {
          //client not have local cart
          newCart.totalAmount = kq.totalAmount;
          newCart.productList = [...kq.productList];

          localStorage.set("cart", newCart);
        } else {
          //client has local cart
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
          kq.totalAmount = utils.calTotal(kq);
          newCart.productList = [...productLocal];
          newCart.totalAmount = kq.totalAmount;

          yield call(APIv2.update, "carts", kq, `cart${uid}`);
          localStorage.set("cart", newCart);
        }
        yield put(actions.fetchCartSuccess(newCart));
      } else if (cart) {
        //client has local cart but not firestore cart
        const uid = getUserId();

        const newCart = {
          uid: uid,
          productList: cart.productList,
          totalAmount: cart.totalAmount,
        };

        yield call(APIv2.set, "carts", `cart${uid}`, newCart);
        yield put(actions.fetchCartSuccess(newCart));
      } else {
        yield put(actions.fetchCartSuccess());
      }
    } else if (cart) {
      //not sign in
      yield put(actions.fetchCartSuccess(cart));
    } else {
      yield put(actions.fetchCartSuccess());
    }
  } catch (err) {
    yield put(actions.fetchCartFail());
  }
}

export function* addCart({ payload: { product } }) {
  try {
    const token = localStorage.get("token");
    const cart = localStorage.get("cart");

    if (token) {
      const uid = getUserId();
      let rs = yield call(APIv2.get, "carts", `cart${uid}`);
      rs = rs || {};

      const currentCart = {};
      if (cart) {
        currentCart.productList = [...cart.productList];
        currentCart.totalAmount = cart.totalAmount;
      } else {
        currentCart.productList = [];
        currentCart.totalAmount = 0;
      }

      const newCart = handleAddCart(currentCart, { product });

      rs.totalAmount = newCart.totalAmount;
      rs.productList = newCart.productList;

      const { id, ...others } = rs;
      const newData = {
        ...others,
      };

      yield call(APIv2.set, "carts", `cart${uid}`, newData);
    }

    yield put(actions.fetchAddCartSuccess({ product }));
  } catch (err) {
    console.log(err);
  }
}

export function* updateCart(action) {
  const product = action.payload.product;

  try {
    const token = localStorage.get("token");
    const cart = localStorage.get("cart");

    if (token) {
      const uid = getUserId();
      const rs = yield call(APIv2.get, "carts", `cart${uid}`);
      const newCart = handleUpdateCart(cart, { product });

      rs.totalAmount = newCart.totalAmount;
      rs.productList = newCart.productList;

      const { id, ...others } = rs;
      const newData = {
        ...others,
      };

      yield call(APIv2.update, "carts", newData, `cart${uid}`);
    }
    yield put(actions.updateCart({ product }));
  } catch (e) {}
}

export default function* root() {
  yield takeEvery("cart/fetchCartRequest", getCart);
  yield takeEvery("cart/fetchAddCartRequest", addCart);
  yield takeEvery("cart/updateCartRequest", updateCart);
}
