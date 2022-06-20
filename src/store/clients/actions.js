import { call, takeEvery, put } from "redux-saga/effects";

import API from "../../service";
import { clientActions } from "./slice";
import {
  signinAuth,
  signup,
  signinWithGoogleAuth,
  signinWithFacebookAuth,
} from "../../service/auth";
import { USER_ACTIONS } from "../../constants";

export function* signinWithEmailAndPassword({ password, email }) {
  yield put(clientActions.signinRequest());

  const rs = yield call(signinAuth, email, password);

  if (rs && !rs.code) {
    const clients = yield call(API.get, { path: "clients" });
    const client = clients.find((c) => c.id === rs.id) || {};
    rs.image = client.image;
    rs.displayName = client.displayName;
    rs.phoneNumber = client.phoneNumber;

    if (Object.keys(client).length === 0) {
      yield put(clientActions.signinFail());
    } else {
      yield put(clientActions.signinSuccess(rs));
    }
  } else {
    yield put(clientActions.signinFail());
  }
}

export function* signinWithGoogle() {
  const rs = yield call(signinWithGoogleAuth);

  if (rs && !rs.code) {
    const clients = yield call(API.get, { path: "clients" });
    const client = clients.find((c) => c.id === rs.id) || {};

    //new client
    if (Object.keys(client).length === 0) {
      const newClient = {
        id: rs.id,
        displayName: rs.displayName,
        email: rs.email,
        password: "",
        image: rs.image || "https://i.ibb.co/4pGF0yV/default-user.png",
        phoneNumber: rs.phoneNumber || "",
      };

      yield call(API.post, { path: "clients", query: newClient });
    }
    yield put(clientActions.signinSuccess(rs));
  }
}

export function* signinWithFacebook() {
  const rs = yield call(signinWithFacebookAuth);

  console.log(rs);
  if (rs && !rs.code) {
    const clients = yield call(API.get, { path: "clients" });
    const client = clients.find((c) => c.id === rs.id) || {};

    if (Object.keys(client).length === 0) {
      const newClient = {
        id: rs.id,
        displayName: rs.displayName,
        email: rs.email,
        password: "",
        image: rs.image || "https://i.ibb.co/4pGF0yV/default-user.png",
        phoneNumber: rs.phoneNumber || "",
      };

      yield call(API.post, { path: "clients", query: newClient });
    }
    yield put(clientActions.signinSuccess(rs));
  }
}

export function* signupUser({ email, password, user }) {
  yield put(clientActions.signupRequest());

  const rs = yield call(signup, email, password, user);

  if (rs && !rs.code) {
    user.id = rs.id;
    user.image = "https://i.ibb.co/4pGF0yV/default-user.png";

    const jss = yield call(API.post, { path: "clients", query: user });
    console.log(jss);
    yield put(clientActions.signupSuccess(rs));
  } else {
    yield put(clientActions.signupFail(rs.code));
  }
}

export default function* clientSaga() {
  yield takeEvery(USER_ACTIONS.SIGNIN_USER, signinWithEmailAndPassword);
  yield takeEvery(USER_ACTIONS.SIGNIN_USER_WITH_FACEBOOK, signinWithFacebook);
  yield takeEvery(USER_ACTIONS.SIGNIN_USER_WITH_GOOGLE, signinWithGoogle);
  yield takeEvery(USER_ACTIONS.SIGNUP_USER, signupUser);
}
