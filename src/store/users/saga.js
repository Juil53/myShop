import { call, put, takeEvery } from "redux-saga/effects";

import { USER_ACTIONS } from "../../constants";
import { signinAuth, signoutAuth, signup } from "../../service/auth";
import { default as APIv2, default as fb } from "../../service/db";
import {
  deleteUserFailed,
  deleteUserSuccess,
  getUserFailed,
  getUsersFailed,
  getUsersSuccess,
  getUserSuccess,
  signinAdminFail,
  signinAdminRequest,
  signinAdminSuccess,
  signoutAdmin,
  submitUserFailed,
  submitUserSuccess,
} from "./usersSlice";

//GET USER DATA
export function* actGetUsers() {
  try {
    const result = yield call(fb.getAll, "users");
    yield put(getUsersSuccess(result));
  } catch (error) {
    yield put(getUsersFailed(error));
  }
}

export function* actGetUser(action) {
  try {
    const result = yield call(fb.get, "users", action.payload);
    yield put(getUserSuccess(result));
  } catch (error) {
    yield put(getUserFailed(error));
  }
}

// GET USER DATA PAGINATION
// export function* actGetUserPagination(action) {
//   const { page } = action.payload;
//   try {
//     const result = yield call(
//       apiInstance.get,
//       `users?_page=${page}&_limit=${ROWS_PER_PAGE}`
//     );
//     yield put(getUserPaginationSuccess(result));
//   } catch (err) {
//     yield put(getUserPaginationFailed());
//   }
// }

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
    yield call(fb.del, "users", action.payload);
    yield put(deleteUserSuccess());
  } catch (err) {
    yield put(deleteUserFailed(err));
  }
}

// UPDATE USER
export function* actUpdateUserInfo(action) {
  console.log(action);
  try {
    const result = yield call(fb.update, `users/${action.payload.id}`, action.payload.state);
    yield put(submitUserSuccess(result));
  } catch (err) {
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
  yield takeEvery("users/getUsersRequest", actGetUsers);
  yield takeEvery("users/getUserRequest", actGetUser);
  yield takeEvery("users/submitUserRequest", actAddUser);
  yield takeEvery("users/deleteUserRequest", actDeleteUser);
  yield takeEvery("users/updateUserInfoRequest", actUpdateUserInfo);
  // yield takeEvery("users/getUserPaginationRequest", actGetUserPagination);
  yield takeEvery(USER_ACTIONS.ADMIN_SIGNIN, signinAdmin);
  yield takeEvery(USER_ACTIONS.ADMIN_SIGNOUT, signout);
}
