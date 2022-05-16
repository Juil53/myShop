import { createSlice } from "@reduxjs/toolkit";

import { constant as c, LOADING_STATUS } from "../../constants";

const initialState = {
  allProducts: {
    status: c.LOADING,
    data: [],
  },
  hotProducts: {
    status: c.LOADING,
    data: [],
  },
  newProducts: {
    status: c.LOADING,
    data: [],
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    fetchHotProductsRequest: (state) => {
      state.hotProducts.status = LOADING_STATUS.LOADING;
    },

    fetchHotProductsSuccess: (state, action) => {
      state.hotProducts.status = LOADING_STATUS.SUCCESS;
      state.hotProducts.data = action.payload;
    },

    fetchHotProductsFail: (state) => {
      state.hotProducts.status = LOADING_STATUS.FAIL;
    },

    fetchAllProductsRequest: (state) => {
      state.allProducts.status = LOADING_STATUS.LOADING;
    },

    fetchAllProductsSuccess: (state, action) => {
      console.log(action);
      state.allProducts.status = LOADING_STATUS.SUCCESS;
      state.allProducts.data = action.payload;
    },

    fetchAllProductsFail: (state) => {
      state.allProducts.status = LOADING_STATUS.FAIL;
    },

    fetchNewProductsRequest: (state) => {
      state.newProducts.status = LOADING_STATUS.LOADING;
    },

    fetchNewProductsSuccess: (state, action) => {
      state.newProducts.status = LOADING_STATUS.SUCCESS;
      state.newProducts.data = action.payload;
    },

    fetchHotProductsFail: (state) => {
      state.newProducts.status = LOADING_STATUS.FAIL;
    },
  },
});

export const actions = { ...productSlice.actions };

export default productSlice.reducer;
