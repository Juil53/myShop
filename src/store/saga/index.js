import { all } from "redux-saga/effects";

import categoriesSaga from "../categories/saga";
import pageSaga from "../page/saga";
import productSaga from "../products/saga";
import cartSaga from "../cart/saga";
import userSaga from "../users/saga";
import adminProductSaga from "../admin_product/saga";
import adminOrderSaga from "../orders/saga";
import clientSaga from "../clients/saga";

export default function* rootSaga() {
  yield all([
    categoriesSaga(),
    pageSaga(),
    productSaga(),
    cartSaga(),
    userSaga(),
    adminProductSaga(),
    adminOrderSaga(),
    clientSaga(),
  ]);
}
