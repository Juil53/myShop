import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
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

const adapter = ({ user = {}, _tokenResponse = {} }) => {
  const { accessToken, displayName, email } = user;
  const { refreshToken } = _tokenResponse;

  return {
    accessToken,
    displayName,
    email,
    refreshToken,
  };
};

export const signin = async (email = "", password = "") => {
  try {
    const res = await signInWithEmailAndPassword(authInstance, email, password);

    if (!res.user) return null;

    return adapter(res);
  } catch (e) {
    console.log(e, JSON.stringify(e));

    return null;
  }
};

export const signup = async (email, password, info) => {
  try {
    const { user } = await createUserWithEmailAndPassword(email, password);

    if (!user) return null;

    const rs = await user.updateProfile({
      info,
    });

    return rs;
  } catch (e) {
    return null;
  }
};
