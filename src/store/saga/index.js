import { all } from "redux-saga/effects";

import categoriesSaga from "../categories/actions";
import pageSaga from "../page/actions";
import productSaga from "../products/actions";
import cartSaga from "../cart/actions";
import userSaga from "../users/actions";
import adminProductSaga from "../admin_product/action";
import adminOrderSaga from "../orders/action";

export default function* rootSaga() {
  yield all([
    categoriesSaga(),
    pageSaga(),
    productSaga(),
    cartSaga(),
    userSaga(),
    adminProductSaga(),
    adminOrderSaga(),
  ]);
}
