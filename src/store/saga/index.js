import { all } from "redux-saga/effects";

import categoriesSaga from "../categories/actions";
import pageSaga from "../page/actions";
import productSaga from "../products/actions";
import cartSaga from "../cart/actions";
import userSaga from "../users/saga";
import adminProductSaga from "../admin_product/saga";
import adminOrderSaga from "../orders/saga";
import clientSaga from "../clients/actions";

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
