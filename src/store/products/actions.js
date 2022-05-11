import { createAsyncThunk } from "@reduxjs/toolkit";

import { constant } from "../../constants";
import { productService } from "./services";

export const fetchHotProduct = createAsyncThunk(
  "product/getHotProduct",
  async () => {
    try {
      const data = await productService.getAllProduct();
      return data;
    } catch (err) {
      console.log(err);
      return { msg: err.msg };
    }
  }
);

function getAllProduct() {
  return (dispatch) => {
    productService.getAllProduct().then((res) => {
      dispatch(success(res));
    });
  };
  function success(data) {
    return { type: constant.GET_PRODUCTS_SUCCESS, data };
  }
}
export const productActions = {
  getAllProduct,
};
