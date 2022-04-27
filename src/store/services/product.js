import { getData, getDataById } from "./index";

export const sort = async (sortBy, sortValue) => {
  const products = await getData("products");
  //sort
};
export const getProductByID = async (id) => {
  const product = await getDataById("products", id);
  return product;
};
