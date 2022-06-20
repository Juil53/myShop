import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB4Tqj5cjDgL17JANqsxlLwR3waPymPTxw",
  authDomain: "my-shop-auth.firebaseapp.com",
  projectId: "my-shop-auth",
  storageBucket: "my-shop-auth.appspot.com",
  messagingSenderId: "546364000877",
  appId: "1:546364000877:web:7ebe014c50ab4663948d64",
};

const firebase = initializeApp(firebaseConfig);

const authInstance = getAuth(firebase);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const adapter = ({ user = {}, _tokenResponse = {} }) => {
  const { accessToken, displayName, email, uid, photoURL, phoneNumber } = user;
  const { refreshToken } = _tokenResponse;

  return {
    accessToken,
    displayName,
    email,
    refreshToken,
    uid,
    photoURL,
    phoneNumber,
  };
};

export const signinAuth = async (email = "", password = "") => {
  try {
    const res = await signInWithEmailAndPassword(authInstance, email, password);

    if (!res.user) return null;

    return adapter(res);
  } catch (e) {
    console.log(JSON.parse(JSON.stringify(e)));

    return JSON.parse(JSON.stringify(e));
  }
};

export const signup = async (email = "", password = "") => {
  const auth = getAuth();

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    if (!res.user) return null;

    return adapter(res);
  } catch (e) {
    console.log(JSON.parse(JSON.stringify(e)));

    return JSON.parse(JSON.stringify(e));
  }
};

export const storage = getStorage(firebase);

export const signinWithGoogleAuth = async () => {
  try {
    const rs = await signInWithPopup(authInstance, googleProvider);

    if (!rs.user) return null;

    return adapter(rs);
  } catch (e) {
    console.log(JSON.parse(JSON.stringify(e)));

    return JSON.parse(JSON.stringify(e));
  }
};

export const signinWithFacebookAuth = async () => {
  try {
    const rs = await signInWithPopup(authInstance, facebookProvider);

    if (!rs.user) return null;

    return adapter(rs);
  } catch (e) {
    console.log(JSON.parse(JSON.stringify(e)));

    return JSON.parse(JSON.stringify(e));
  }
};
