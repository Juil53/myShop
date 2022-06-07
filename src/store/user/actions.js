import { call, put, takeEvery } from "redux-saga/effects";

import { USER_ACTIONS } from "../../constants";
import API from "../../service";
import { actions } from "./slice";

export function* findUser({ password, email }) {
  const result = yield call(API.get, { path: "user" });

  const rs = result.filter((v) => v.email === email && v.password === password);
  yield put(actions.findUserByEmail(rs));
}

export default function* root() {
  yield takeEvery(USER_ACTIONS.FIND_USER, findUser);
}
