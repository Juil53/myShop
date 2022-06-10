import { call, put, takeEvery } from "redux-saga/effects";

import { USER_ACTIONS } from "../../constants";
import { signin } from "../../service/auth";
import localStorage from "../../service/localStorage";
import { actions } from "./slice";

export function* login({ password, email }) {
  yield put(actions.loginRequest());

  const rs = yield call(signin, email, password);

  if (rs) {
    yield put(actions.loginSuccess(rs));
    yield put(actions.getUserInfo(rs));
  } else {
    yield put(actions.loginFail());
  }
}

export function* getUserInfo() {
  const rs = localStorage.get("user");

  if (rs) {
    yield put(actions.getUserInfo(rs));
  }
}

export default function* root() {
  yield takeEvery(USER_ACTIONS.LOGIN_USER, login);
  yield takeEvery(USER_ACTIONS.GET_USER_INFO, getUserInfo);
}
