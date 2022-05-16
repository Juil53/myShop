import { all } from "redux-saga/effects";

import categoriesSaga from "../categories/actions";
import pageSaga from "../page/actions";
import productSaga from "../products/actions";

export default function* rootSaga() {
  yield all([categoriesSaga(), pageSaga(), productSaga()]);
}
