import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    options: [],
    loading: false,
    error: null,
    products: null,
    productsPagination:null,
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
  },
});

export const {
  getOptionsRequest,
  getOptionsSuccess,
  getOptionsFailed,
  submitProductRequest,
  submitProductSuccess,
  submitProductFailed,
  getAllProductRequest,
  getAllProductSuccess,
  getAllProductFailed,
  getProductPaginationRequest,
  getProductPaginationSuccess,
  getProductPaginationFailed
} = productSlice.actions;

export default productSlice.reducer;
