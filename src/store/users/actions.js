import { call, put, takeEvery } from "redux-saga/effects";

import apiInstance from "../../utils/axios/axiosInstance";
import {
  getUserFailed,
  getUserPaginationFailed,
  getUserPaginationSuccess,
  getUserSuccess,
  submitUserFailed,
  submitUserSuccess,
  signinAdminFail,
  signinAdminSuccess,
  signinAdminRequest,
} from "./usersSlice";
import { signinAuth, signup } from "../../service/auth";
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
    const result = yield call(apiInstance.get, `user?_page=${page}&_limit=${ROWS_PER_PAGE}`);
    yield put(getUserPaginationSuccess(result));
  } catch (err) {
    yield put(getUserPaginationFailed());
  }
}

// ADD USER
export function* actAddUser(action) {
  const { values } = action.payload;
  const { password, email } = values;

  try {
    const rs = yield call(signup, email, password);

    if (rs && !rs.code) {
      values.id = rs.id;
      const result = yield call(apiInstance.post, "user", values);
      yield put(submitUserSuccess(result));
      actGetUserPagination({ page: 1, ROWS_PER_PAGE: 10 });
    }
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
    const result = yield call(apiInstance.put, `user/${action.payload.id}`, action.payload.state);
    yield put(submitUserSuccess(result));
    yield put(actGetUserPagination());
  } catch (err) {
    console.log(err);
    yield put(submitUserFailed());
  }
}

export function* signinAdmin({ password, email }) {
  yield put(signinAdminRequest());

  const rs = yield call(signinAuth, email, password);

  if (!rs.code) {
    const users = yield call(apiInstance.get, "user");
    const user = users.find((u) => u.id === rs.id) || {};

    rs.role = user.role;
    rs.image = user.avatar || "https://i.ibb.co/4pGF0yV/default-user.png";
    rs.displayName = user.lastname;

    const approveRoles = ["Admin", "Staff"];
    if (Object.keys(user).length === 0 || !approveRoles.includes(user.role)) {
      yield put(signinAdminFail());
    } else {
      yield put(signinAdminSuccess(rs));
    }
  } else {
    yield put(signinAdminFail());
  }
}

export default function* userSaga() {
  yield takeEvery("users/getUserRequest", actGetUser);
  yield takeEvery("users/getUserPaginationRequest", actGetUserPagination);
  yield takeEvery("users/submitUserRequest", actAddUser);
  yield takeEvery("DELETE_USER", actDeleteUser);
  yield takeEvery("users/updateUserInfo", actUpdateUserInfo);
  yield takeEvery(USER_ACTIONS.SIGNIN_ADMIN, signinAdmin);
}
