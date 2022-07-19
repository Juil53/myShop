import { call, put, takeEvery } from "redux-saga/effects";

import { ROWS_PER_PAGE } from "../../constants";
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
  deleteUserSuccess,
  deleteUserFailed,
  signoutAdmin,
} from "./usersSlice";
import { signinAuth, signup, signoutAuth } from "../../service/auth";
import { USER_ACTIONS } from "../../constants";
import APIv2 from "../../service/db";
import fb from "../../service/db";

//GET USER DATA
export function* actGetUser() {
  try {
    const result = yield call(apiInstance.get, "users");
    yield put(getUserSuccess(result));
  } catch (err) {
    console.log(err);
    yield put(getUserFailed());
  }
}

// GET USER DATA PAGINATION
export function* actGetUserPagination(action) {
  const { page } = action.payload;
  try {
    const result = yield call(
      apiInstance.get,
      `users?_page=${page}&_limit=${ROWS_PER_PAGE}`
    );
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
      //const result = yield call(apiInstance.post, "users", values);
      const result = yield call(APIv2.set("users", rs.id, values));
      yield put(submitUserSuccess(result));
    }
  } catch (err) {
    console.log(err);
    yield put(submitUserFailed());
  }
}

// DELETE USER
export function* actDeleteUser(action) {
  try {
    yield call(fb.del("users", action.payload));
    yield put(deleteUserSuccess());
  } catch (err) {
    yield put(deleteUserFailed(err));
  }
}

// UPDATE USER
export function* actUpdateUserInfo(action) {
  try {
    const result = yield call(
      apiInstance.put,
      `users/${action.payload.id}`,
      action.payload.state
    );
    yield put(submitUserSuccess(result));
  } catch (err) {
    console.log(err);
    yield put(submitUserFailed());
  }
}

export function* signinAdmin({ password, email }) {
  yield put(signinAdminRequest());

  const rs = yield call(signinAuth, email, password);

  if (!rs.code) {
    const user = yield call(APIv2.get, "users", rs.id);

    const data = {
      token: rs.accessToken,
      info: {
        displayName: user.lastname,
        image: user.avatar || "https://i.ibb.co/4pGF0yV/default-user.png",
        ...user,
      },
    };

    const approveRoles = ["Admin", "Staff"];
    if (Object.keys(user).length === 0 || !approveRoles.includes(user.role)) {
      yield put(signinAdminFail("Access denied"));
    } else {
      yield put(signinAdminSuccess(data));
    }
  } else {
    yield put(signinAdminFail(rs.code));
  }
}

export function* signout() {
  yield call(signoutAuth);
  yield put(signoutAdmin());
}

export default function* userSaga() {
  yield takeEvery("users/getUserRequest", actGetUser);
  yield takeEvery("users/getUserPaginationRequest", actGetUserPagination);
  yield takeEvery("users/submitUserRequest", actAddUser);
  yield takeEvery("users/deleteUserRequest", actDeleteUser);
  yield takeEvery("users/updateUserInfoRequest", actUpdateUserInfo);
  yield takeEvery(USER_ACTIONS.ADMIN_SIGNIN, signinAdmin);
  yield takeEvery(USER_ACTIONS.ADMIN_SIGNOUT, signout);
}
