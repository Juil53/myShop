import { delay, clone } from "../../utils";

import products from "./mock/products";

const data = {
  products,
};

export const getData = async (name) => {
  await delay(1500);
  const rs = data[name];
  return clone(rs);
};

export const getDataById = async (name, id) => {
  await delay(1500);
  const rs = data[name].filter((v) => v.id === id);
  return clone(rs);
};
