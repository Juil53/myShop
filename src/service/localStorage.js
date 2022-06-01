const get = (key) => {
  const rs = window.localStorage.getItem(key);
  return JSON.parse(rs);
};

const set = (key, value) => {
  const tmp = JSON.stringify(value);
  window.localStorage.setItem(key, tmp);
};

const remove = (key) => {
  window.localStorage.removeItem(key);
};

export default {
  get,
  set,
  remove,
};
