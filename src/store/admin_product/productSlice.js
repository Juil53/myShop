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
    status:false,
    categories: [],
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
      // state.products = action.payload;
      const productList = [...state.products];
      if (action.payload.id) {
        const index = productList.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          //Edit
          productList[index] = action.payload;
        } else {
          //Add
          productList.push(action.payload);
        }
      }
      state.products = productList;
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

    deleteProductRequest(state){
      state.status = false
    },

    deleteProductSuccess(state){
      state.status = true
    },

    deleteProductFailed(state){
      state.status = false
    },

    resetStatus(state){
      state.status = false
    }
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
  getProductInfo,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailed,
  resetStatus
} = productSlice.actions;

export default productSlice.reducer;
