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
  searchResult: {
    status: LOADING_STATUS.IDLE,
    data: [],
  },
  product: {},
  loading: false,
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

    searchProductRequest: (state) => {
      state.searchResult.status = LOADING_STATUS.LOADING;
    },

    searchProductSuccess: (state, action) => {
      state.searchResult.status = LOADING_STATUS.SUCCESS;
      state.searchResult.data = action.payload;
    },

    searchProductFail: (state) => {
      state.searchResult.status = LOADING_STATUS.FAIL;
    },
    getProductRequest: (state, action) => {
      state.loading = true;
    },
    getProductSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    getProductFailed: (state, action) => {
      state.loading = false;
    },
  },
});

export const actions = { ...productSlice.actions };

export default productSlice.reducer;
