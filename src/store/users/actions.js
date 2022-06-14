import { call, put, takeEvery } from "redux-saga/effects";

import apiInstance from "../../utils/axios/axiosInstance";
import {
  getUserFailed,
  getUserPaginationFailed,
  getUserPaginationSuccess,
  getUserSuccess,
  submitUserFailed,
  submitUserSuccess,
  loginFail,
  loginRequest,
  loginSuccess,
} from "./usersSlice";
import { signin } from "../../service/auth";
import { USER_ACTIONS } from "../../constants";

//GET USER DATA
export function* actGetUser() {
  try {
    const result = yield call(apiInstance.get, "user");
    yield put(getUserSuccess(result));
  } catch (err) {
    console.log(err);
    yield put(getUserFailed());
  }
}

// GET USER DATA PAGINATION
export function* actGetUserPagination(action) {
  const { page, ROWS_PER_PAGE } = action.payload;
  try {
    const result = yield call(
      apiInstance.get,
      `user?_page=${page}&_limit=${ROWS_PER_PAGE}`
    );
    yield put(getUserPaginationSuccess(result));
  } catch (err) {
    yield put(getUserPaginationFailed());
  }
}

// ADD USER
export function* actAddUser(action) {
  const { values } = action.payload;
  try {
    const result = yield call(apiInstance.post, "user", values);
    yield put(submitUserSuccess(result));
  } catch (err) {
    console.log(err);
    yield put(submitUserFailed());
  }
}

// DELETE USER
export function* actDeleteUser(action) {
  try {
    yield call(apiInstance.delete, `user/${action.payload}`);
  } catch (err) {
    console.log(err);
  }
}

// UPDATE USER
export function* actUpdateUserInfo(action) {
  try {
    const result = yield call(
      apiInstance.put,
      `user/${action.payload.id}`,
      action.payload.state
    );
    yield put(submitUserSuccess(result));
    yield put(actGetUserPagination());
  } catch (err) {
    console.log(err);
    yield put(submitUserFailed());
  }
}

export function* login({ password, email }) {
  yield put(loginRequest());

  const rs = yield call(signin, email, password);

  if (rs) {
    yield put(loginSuccess(rs));
  } else {
    yield put(loginFail());
  }
}

export default function* userSaga() {
  yield takeEvery("users/getUserRequest", actGetUser);
  yield takeEvery("users/getUserPaginationRequest", actGetUserPagination);
  yield takeEvery("users/submitUserRequest", actAddUser);
  yield takeEvery("DELETE_USER", actDeleteUser);
  yield takeEvery("users/updateUserInfo", actUpdateUserInfo);
  yield takeEvery(USER_ACTIONS.LOGIN_USER, login);
}
