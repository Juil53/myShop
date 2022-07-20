import decode from "jwt-decode";

let token = "";
let decoded = null;

export const getToken = (source) => {
  if (token) return token;
  let user = localStorage.getItem(source);
  if (user) {
    user = JSON.parse(user);
    token = user ? localStorage.getItem(source) : "";
  }
  return token;
};

export const decodeToken = (source) => {
  if (decoded) return decoded;
  const t = getToken(source);
  try {
    decoded = decode(t);
  } catch (e) {
    decoded = null;
  }
  return decoded;
};

export const getTokenRemainTime = (source) => {
  const d = decodeToken(source);
  if (!d || !d.exp) return -1;
  const current = new Date().getTime();
  const rs = d.exp * 1000 - current;
  return rs;
};

export const getUserId = (source) => {
  const d = decodeToken(source);
  if (d) {
    return d.user_id;
  } else {
    return "";
  }
};

export const isTokenValid = (source) => {
  const d = decodeToken(source);
  if (!d) return false;
  const r = getTokenRemainTime(source);
  return r > 0;
};
