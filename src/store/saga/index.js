import { all, takeEvery } from "redux-saga/effects";

import categoriesSaga from "../categories/actions";
import pageSaga from "../page/actions";

export default function* rootSaga() {
  yield all([categoriesSaga(), pageSaga()]);
}
