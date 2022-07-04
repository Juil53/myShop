import { call, takeEvery, put } from "redux-saga/effects";

import API from "../../service";
import { clientActions } from "./slice";
import {
  signinAuth,
  signup,
  signinWithGoogleAuth,
  signinWithFacebookAuth,
  signoutAuth,
  updatePasswordAuth,
} from "../../service/auth";
import { USER_ACTIONS } from "../../constants";
import { getUserId } from "../../utils/auth";

export function* signinWithEmailAndPassword({ password, email }) {
  yield put(clientActions.signinRequest());

  const rs = yield call(signinAuth, email, password);

  if (rs && !rs.code) {
    const clients = yield call(API.get, { path: "clients" });

    if (clients) {
      const client = clients.find((c) => c.id === rs.id) || {};

      const data = {
        token: rs.accessToken,
        providerID: rs.providerId,
      };

      if (Object.keys(client).length === 0) {
        yield put(clientActions.signinFail("User not found"));
      } else {
        yield put(clientActions.signinSuccess(data));
      }
    } else {
      yield put(
        clientActions.signinFail("Something went wrong. Please try again later")
      );
    }
  } else {
    yield put(clientActions.signinFail(rs.code));
  }
}

export function* signinWithGoogle() {
  const rs = yield call(signinWithGoogleAuth);

  if (rs && !rs.code) {
    const clients = yield call(API.get, { path: "clients" });

    if (clients) {
      const client = clients.find((c) => c.id === rs.id) || {};

      console.log(rs.providerId);
      const data = {
        token: rs.accessToken,
        providerID: rs.providerId,
      };

      //new client
      if (Object.keys(client).length === 0) {
        const newClient = {
          id: rs.id,
          displayName: rs.displayName,
          email: rs.email,
          image: rs.image || "https://i.ibb.co/4pGF0yV/default-user.png",
          phoneNumber: rs.phoneNumber || "",
        };

        yield call(API.post, { path: "clients", query: newClient });
      } else {
        if (client.image === "https://i.ibb.co/4pGF0yV/default-user.png") {
          client.image = rs.image;
        }

        if (!client.phoneNumber && rs.phoneNumber) {
          client.phoneNumber = rs.phoneNumber;
        }

        yield call(API.put, { path: `clients/${client.id}`, query: client });
      }

      yield put(clientActions.signinSuccess(data));
    } else {
      yield put(clientActions.signinFail());
    }
  } else {
    yield put(clientActions.signinFail(rs.code));
  }
}

export function* signinWithFacebook() {
  const rs = yield call(signinWithFacebookAuth);

  if (rs && !rs.code) {
    const clients = yield call(API.get, { path: "clients" });
    if (clients) {
      const client = clients.find((c) => c.id === rs.id) || {};

      const data = {
        token: rs.accessToken,
        providerID: rs.providerId,
      };

      if (Object.keys(client).length === 0) {
        const newClient = {
          id: rs.id,
          displayName: rs.displayName,
          email: rs.email,
          image: rs.image || "https://i.ibb.co/4pGF0yV/default-user.png",
          phoneNumber: rs.phoneNumber || "",
        };

        yield call(API.post, { path: "clients", query: newClient });
      } else {
        if (client.image === "https://i.ibb.co/4pGF0yV/default-user.png") {
          client.image = rs.image;
        }

        if (!client.phoneNumber && rs.phoneNumber) {
          client.phoneNumber = rs.phoneNumber;
        }

        yield call(API.put, { path: `clients/${client.id}`, query: client });
      }

      yield put(clientActions.signinSuccess(data));
    } else {
      yield put(clientActions.signinFail());
    }
  } else {
    yield put(clientActions.signinFail(rs.code));
  }
}

export function* signupUser({ email, password, user }) {
  yield put(clientActions.signupRequest());

  const rs = yield call(signup, email, password);

  if (rs && !rs.code) {
    user.id = rs.id;
    user.image = "https://i.ibb.co/4pGF0yV/default-user.png";

    const data = {
      token: rs.accessToken,
      providerID: rs.providerId,
    };

    yield call(API.post, { path: "clients", query: user });
    yield put(clientActions.signupSuccess(data));
  } else {
    yield put(clientActions.signupFail(rs.code));
  }
}

export function* signout() {
  yield call(signoutAuth);
  yield put(clientActions.signout());
}

export function* getUserInfo() {
  try {
    const userID = getUserId();
    if (userID) {
      const rs = yield call(API.get, { path: `clients/${userID}` });
      if (rs) {
        const data = { ...rs };

        yield put(clientActions.getUserInfo(data));
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export function* updateInfo({ data, uid }) {
  yield put(clientActions.updateRequest());

  if (data && uid) {
    try {
      const rs = yield call(API.patch, { path: `clients/${uid}`, query: data });

      if (rs) {
        yield put(clientActions.updateSuccess(rs));
      }
    } catch (e) {
      console.log(e);
      yield put(clientActions.updateFail());
    }
  } else {
    yield put(clientActions.updateFail());
  }
}

export function* updatePassword({ currentPass, newPass }) {
  yield put(clientActions.updateRequest());

  try {
    const rs = yield call(updatePasswordAuth, currentPass, newPass);

    if (rs && rs.code) {
      yield put(clientActions.updateFail(rs.code));
    } else {
      yield put(clientActions.updateSuccess());
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* clientSaga() {
  yield takeEvery(USER_ACTIONS.SIGNIN_USER, signinWithEmailAndPassword);
  yield takeEvery(USER_ACTIONS.SIGNIN_USER_WITH_FACEBOOK, signinWithFacebook);
  yield takeEvery(USER_ACTIONS.SIGNIN_USER_WITH_GOOGLE, signinWithGoogle);
  yield takeEvery(USER_ACTIONS.SIGNUP_USER, signupUser);
  yield takeEvery(USER_ACTIONS.SIGNOUT_USER, signout);
  yield takeEvery(USER_ACTIONS.UPDATE_USER_INFO, updateInfo);
  yield takeEvery(USER_ACTIONS.GET_USER_INFO, getUserInfo);
  yield takeEvery(USER_ACTIONS.UPDATE_USER_PASSWORD, updatePassword);
}
