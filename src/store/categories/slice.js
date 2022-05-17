import { createSlice } from "@reduxjs/toolkit";

import { LOADING_STATUS } from "../../constants";

const initialState = {
  data: [],
  status: LOADING_STATUS.IDLE,
  errorMessage: "",
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,

  reducers: {
    fetchCategoriesRequest: (state) => {
      state.status = LOADING_STATUS.LOADING;
    },

    fetchCategoriesSuccess: (state, action) => {
      state.status = LOADING_STATUS.SUCCESS;
      state.data = action.payload;
    },

    fetchCategoriesFail: (state) => {
      state.status = LOADING_STATUS.FAIL;
    },
  },
});

export const actions = { ...categoriesSlice.actions };

export default categoriesSlice.reducer;
