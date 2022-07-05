import decode from "jwt-decode";

let token = "";
let decoded = null;

export const getToken = () => {
  if (token) return token;
  let user = localStorage.getItem("token");
  if (user) {
    user = JSON.parse(user);
    token = user ? localStorage.getItem("token") : "";
  }
  return token;
};

export const decodeToken = () => {
  if (decoded) return decoded;
  const t = getToken();
  try {
    decoded = decode(t);
  } catch (e) {
    decoded = null;
  }
  return decoded;
};

export const getTokenRemainTime = () => {
  const d = decodeToken();
  if (!d || !d.exp) return -1;
  const current = new Date().getTime();
  const rs = d.exp * 1000 - current;
  return rs;
};

export const getUserId = () => {
  const d = decodeToken();
  if (d) {
    return d.user_id;
  } else {
    return "";
  }
};

export const isTokenValid = () => {
  const d = decodeToken();
  if (!d) return false;
  const r = getTokenRemainTime();
  return r > 0;
};
