import { createSlice } from "@reduxjs/toolkit";

import { constant as c } from "../../constants";
import { fetchHotProduct } from "./actions";

const initialState = {
  hotproduct: {
    status: c.LOADING,
    data: [],
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,

  extraReducers: {
    [fetchHotProduct.fulfilled]: (state, action) => {
      state.hotproduct.data = action.payload;
      state.hotproduct.status = c.GET_PRODUCTS_SUCCESS;
    },
  },
});

export default productSlice.reducer;
