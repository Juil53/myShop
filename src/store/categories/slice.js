import { createSlice } from "@reduxjs/toolkit";

import { LOADING_STATUS } from "../../constants";

const initialState = {
  data: [],
  status: LOADING_STATUS.IDLE,
  categorySelected:"",
  subCategorySelected:"",
  errorMessage: "",
  loading:false,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,

  reducers: {
    fetchCategoriesRequest: (state) => {
      state.status = LOADING_STATUS.LOADING;
      state.loading = true;
    },

    fetchCategoriesSuccess: (state, action) => {
      state.status = LOADING_STATUS.SUCCESS;
      state.loading = false;
      state.data = action.payload;
    },

    fetchCategoriesFail: (state) => {
      state.loading = false;
      state.status = LOADING_STATUS.FAIL;
    },

    getSelectedCategory: (state,action) => {
      state.categorySelected = action.payload
    },

    getSelectedSubCategory: (state,action) => {
      state.subCategorySelected = action.payload
    },
  },
});

export const actions = { ...categoriesSlice.actions };

export default categoriesSlice.reducer;
