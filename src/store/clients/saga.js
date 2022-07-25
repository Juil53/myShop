import { call, takeEvery, put, take } from "redux-saga/effects";
import { USER_ACTIONS } from "../../constants";
import {
import APIv2 from "../../service/db";
import { clientActions } from "./slice";
  signinAuth,
  signup,
  signinWithGoogleAuth,
  signinWithFacebookAuth,
  signoutAuth,
  updatePasswordAuth,
  getIdToken,
} from "../../service/auth";
import { getUserId } from "../../utils/decode";
import localStorage from "../../service/localStorage";


export function* signinWithEmailAndPassword({ payload }) {
  const { email, password } = payload;
  const rs = yield call(signinAuth, email, password);

  if (rs && !rs.code) {
    const client = yield call(APIv2.get, "customers", rs.id);

    if (client) {
      const data = {
        token: rs.accessToken,
        providerID: rs.providerId,
        refreshToken: rs.refreshToken,
      };

      yield put(clientActions.signinSuccess(data));
    } else {
      yield put(clientActions.signinFail("User not found"));
    }
  } else {
    yield put(clientActions.signinFail(rs.code));
  }
}

export function* signinWithGoogle() {
  const rs = yield call(signinWithGoogleAuth);

  if (rs && !rs.code) {
    const user = yield call(APIv2.get, "customers", rs.id);

    if (!user) {
      const userData = {
        displayName: rs.displayName,
        email: rs.email,
        image: rs.image || "https://i.ibb.co/4pGF0yV/default-user.png",
        phoneNumber: rs.phoneNumber || "",
      };

      yield call(APIv2.set, "customers", rs.id, userData);
    }

    yield put(
      clientActions.signinSuccess({
        token: rs.accessToken,
        providerID: rs.providerId,
        refreshToken: rs.refreshToken,
      })
    );
  } else {
    yield put(clientActions.signinFail(rs.code));
  }
}

export function* signinWithFacebook() {
  const rs = yield call(signinWithFacebookAuth);

  if (rs && !rs.code) {
    const client = yield call(APIv2.get, "customers", rs.id);

    if (!client) {
      const userData = {
        displayName: rs.displayName,
        email: rs.email,
        image: rs.image || "https://i.ibb.co/4pGF0yV/default-user.png",
        phoneNumber: rs.phoneNumber || "",
      };

      yield call(APIv2.set, "customers", rs.id, userData);
    }

    yield put(
      clientActions.signinSuccess({
        token: rs.accessToken,
        providerID: rs.providerId,
        refreshToken: rs.refreshToken,
      })
    );
  } else {
    yield put(clientActions.signinFail(rs.code));
  }
}

export function* signupUser({ payload }) {
  const { email, password, user } = payload;
  const rs = yield call(signup, email, password);

  if (rs && !rs.code) {
    user.image = "https://i.ibb.co/4pGF0yV/default-user.png";

    const data = {
      token: rs.accessToken,
      providerID: rs.providerId,
    };

    const kq = yield call(APIv2.set, "customers", rs.id, user);

    if (kq) {
      yield put(clientActions.signupSuccess(data));
    } else {
      yield put(clientActions.signupFail());
    }
  } else {
    yield put(clientActions.signupFail(rs.code));
  }
}

export function* signout() {
  yield call(signoutAuth);
  yield put(clientActions.signout());
}

export function* getRefreshToken() {
  try {
    const { access_token: accessToken, refresh_token: refreshToken } =
      yield call(getIdToken);

    if (accessToken) {
      yield put(
        clientActions.getRefreshTokenSuccess({
          token: accessToken,
          refreshToken,
        })
      );
    } else {
      yield call(signout);
    }
  } catch (e) {}
}
export function* getUserInfo() {
  try {
    const userID = getUserId("token");

    if (userID) {
      const rs = yield call(APIv2.get, "customers", userID);
      if (rs) {
        const data = { ...rs, id: userID };

        yield put(clientActions.getUserInfo(data));
      }
    }
  } catch (e) {}
}

export function* updateInfo({ payload }) {
  const { data, uid } = payload || {};
  if (data && uid) {
    try {
      const rs = yield call(APIv2.update, "customers", data, uid);

      if (rs) {
        const newData = yield call(APIv2.get, "customers", uid);
        newData.id = uid;
        yield put(clientActions.updateSuccess(newData));
      }
    } catch (e) {
      yield put(clientActions.updateFail());
    }
  } else {
    yield put(clientActions.updateFail());
  }
}

export function* updatePassword({ payload }) {
  const { currentPass, newPass } = payload || {};

  try {
    const rs = yield call(updatePasswordAuth, currentPass, newPass);

    if (rs && rs.code) {
      yield put(clientActions.updatePasswordFail(rs.code));
    } else {
      yield put(clientActions.updatePasswordSuccess());
    }
  } catch (e) {
    yield put(clientActions.updatePasswordFail());
  }
}

export function* getCustomers() {
  try {
    const result = yield call(APIv2.getAll, "customers");
    yield put(clientActions.getCustomersSuccess(result));
  } catch (error) {
    yield put(clientActions.getCustomersFailed(error));
  }
}

export function* getCustomer(action) {
  try {
    const result = yield call(APIv2.get, "customers", action.payload);
    yield put(clientActions.getCustomerSuccess(result));
  } catch (error) {
    yield put(clientActions.getCustomerFailed(error));
  }
}

// DELETE USER
export function* actDeleteCustomer(action) {
  try {
    yield call(APIv2.del, "customers", action.payload);
    yield put(clientActions.deleteCustomerSuccess());
  } catch (err) {
    yield put(clientActions.deleteCustomerFailed(err));
  }
}

export default function* clientSaga() {
  yield takeEvery("clients/signinRequest", signinWithEmailAndPassword);
  yield takeEvery(USER_ACTIONS.SIGNIN_USER_WITH_FACEBOOK, signinWithFacebook);
  yield takeEvery(USER_ACTIONS.SIGNIN_USER_WITH_GOOGLE, signinWithGoogle);
  yield takeEvery("clients/signupRequest", signupUser);
  yield takeEvery(USER_ACTIONS.SIGNOUT_USER, signout);
  yield takeEvery(USER_ACTIONS.GET_USER_INFO, getUserInfo);
  yield takeEvery("clients/updateRequest", updateInfo);
  yield takeEvery("clients/updatePasswordRequest", updatePassword);
  yield takeEvery("clients/getCustomersRequest", getCustomers);
  yield takeEvery("clients/getCustomerRequest", getCustomer);
  yield takeEvery("clients/deleteCustomerRequest", actDeleteCustomer);
  yield takeEvery(USER_ACTIONS.GET_REFRESH_TOKEN, getRefreshToken);

}
