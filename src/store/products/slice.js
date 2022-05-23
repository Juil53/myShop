import { createSlice } from "@reduxjs/toolkit";

import { LOADING_STATUS } from "../../constants";

const initialState = {
  allProducts: {
    status: LOADING_STATUS.IDLE,
    data: [],
  },
  hotProducts: {
    status: LOADING_STATUS.IDLE,
    data: [],
  },
  newProducts: {
    status: LOADING_STATUS.IDLE,
    data: [],
  },
  bestSellingProducts: {
    status: LOADING_STATUS.IDLE,
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

    fetchNewProductsFail: (state) => {
      state.newProducts.status = LOADING_STATUS.FAIL;
    },

    fetchBestSellingRequest: (state) => {
      state.bestSellingProducts.status = LOADING_STATUS.LOADING;
    },

    fetchBestSellingSuccess: (state, action) => {
      state.bestSellingProducts.status = LOADING_STATUS.SUCCESS;
      state.bestSellingProducts.data = action.payload;
    },

    fetchBestSellingFail: (state) => {
      state.bestSellingProducts.status = LOADING_STATUS.FAIL;
    },
  },
});

export const actions = { ...productSlice.actions };

export default productSlice.reducer;
