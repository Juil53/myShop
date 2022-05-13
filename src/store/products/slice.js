import { createSlice } from "@reduxjs/toolkit";

import { constant as c } from "../../constants";
import { fetchHotProduct } from "./actions";

const initialState = {
  product: {
    status: c.LOADING,
    data: [],
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,

  extraReducers: {
    [fetchHotProduct.fulfilled]: (state, action) => {
      state.product.data = action.payload;
      state.product.status = c.GET_PRODUCTS_SUCCESS;
    },
  },
});

export default productSlice.reducer;
