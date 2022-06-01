import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    options: [],
    loading: false,
    error: null,
    products: [],
    productsPagination: null,
    productInfo: null,
    categories: []
  },
  reducers: {
    getOptionsRequest(state, action) {
      state.loading = true;
    },

    getOptionsSuccess(state, action) {
      state.loading = false;
      state.options = action.payload;
    },

    getOptionsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getCategoriesRequest(state, action) {
      state.loading = true;
    },

    getCategoriesSuccess(state, action) {
      state.loading = false;
      state.categories = action.payload;
    },

    getCategoriesFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    submitProductRequest(state, action) {
      state.loading = true;
    },

    submitProductSuccess(state, action) {
      state.loading = false;
      state.products = action.payload;
    },

    submitProductFailed(state, action) {
      state.loading = false;
      state.products = action.payload;
    },

    getAllProductRequest(state, action) {
      state.loading = true;
    },

    getAllProductSuccess(state, action) {
      state.loading = false;
      state.products = action.payload;
    },

    getAllProductFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getProductPaginationRequest(state, action) {
      state.loading = true;
    },

    getProductPaginationSuccess(state, action) {
      state.loading = false;
      state.productsPagination = action.payload;
    },

    getProductPaginationFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getProductInfo(state, action) {
      state.productInfo = action.payload;
    },
  },
});

export const {
  getOptionsRequest,
  getOptionsSuccess,
  getOptionsFailed,
  getCategoriesRequest,
  getCategoriesSuccess,
  getCategoriesFailed,
  submitProductRequest,
  submitProductSuccess,
  submitProductFailed,
  getAllProductRequest,
  getAllProductSuccess,
  getAllProductFailed,
  getProductPaginationRequest,
  getProductPaginationSuccess,
  getProductPaginationFailed,
  getProductInfo
} = productSlice.actions;

export default productSlice.reducer;
