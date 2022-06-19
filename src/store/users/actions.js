import { call, put, takeEvery } from "redux-saga/effects";

import apiInstance from "../../utils/axios/axiosInstance";
import {
  getUserFailed,
  getUserPaginationFailed,
  getUserPaginationSuccess,
  getUserSuccess,
  submitUserFailed,
  submitUserSuccess,
  signinFail,
  signinRequest,
  signinSuccess,
  signupRequest,
  signupSuccess,
  signupFail,
  signinAdminFail,
  signinAdminSuccess,
  signinAdminRequest,
} from "./usersSlice";
import {
  signinAuth,
  signup,
  signinWithGoogleAuth,
  signinWithFacebookAuth,
} from "../../service/auth";
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

export function* signinWithEmailAndPassword({ password, email }) {
  yield put(signinRequest());

  const rs = yield call(signinAuth, email, password);

  if (rs && !rs.code) {
    yield put(signinSuccess(rs));
  } else {
    yield put(signinFail());
  }
}

export function* signinAdmin({ password, email }) {
  yield put(signinAdminRequest());

  const rs = yield call(signinAuth, email, password);

  if (!rs.code) {
    const users = yield call(apiInstance.get, "user");
    const user = users.find((u) => u.id === rs.uid) || {};
    rs.role = user.role;
    rs.image = user.avatar;
    rs.displayName = user.lastname;
    const approveRoles = ["Admin", "Staff"];
    if (!user || !approveRoles.includes(user.role)) {
      yield put(signinAdminFail());
    } else {
      console.log(rs);
      yield put(signinAdminSuccess(rs));
    }
  } else {
    yield put(signinAdminFail());
  }
}

export function* signinWithGoogle() {
  const rs = yield call(signinWithGoogleAuth);

  if (rs && !rs.code) {
    yield put(signinSuccess(rs));
  }
}

export function* signinWithFacebook() {
  const rs = yield call(signinWithFacebookAuth);

  console.log(rs);
  if (rs && !rs.code) {
    yield put(signinSuccess(rs));
  }
}

export function* signupUser({ email, password, user }) {
  yield put(signupRequest());

  const rs = yield call(signup, email, password, user);
  console.log(rs);
  if (rs && !rs.code) {
    yield put(signupSuccess(rs));
  } else {
    yield put(signupFail(rs.code));
  }
}

export default function* userSaga() {
  yield takeEvery("users/getUserRequest", actGetUser);
  yield takeEvery("users/getUserPaginationRequest", actGetUserPagination);
  yield takeEvery("users/submitUserRequest", actAddUser);
  yield takeEvery("DELETE_USER", actDeleteUser);
  yield takeEvery("users/updateUserInfo", actUpdateUserInfo);
  yield takeEvery(USER_ACTIONS.SIGNIN_USER, signinWithEmailAndPassword);
  yield takeEvery(USER_ACTIONS.SIGNUP_USER, signupUser);
  yield takeEvery(USER_ACTIONS.SIGNIN_USER_WITH_GOOGLE, signinWithGoogle);
  yield takeEvery(USER_ACTIONS.SIGNIN_USER_WITH_FACEBOOK, signinWithFacebook);
  yield takeEvery(USER_ACTIONS.SIGNIN_ADMIN, signinAdmin);
}
