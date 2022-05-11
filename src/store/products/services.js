import { constant } from "../../constants";

function getAllProduct() {
  const reqObj = {
    method: "GET",
  };
  return fetch(constant.API_URL + "/product", reqObj)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => {
      console.log(err);
      return [];
    });
}

export const getHotProduct = async () => {
  try {
    const data = await fetch(constant.API_URL + "/product", {
      method: "GET",
    });
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const productService = {
  getAllProduct,
};
