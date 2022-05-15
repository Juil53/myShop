import { createSlice } from "@reduxjs/toolkit";

import { constant as c } from "../../constants";

const initialState = {
  data: [],
  status: c.LOADING,
  errorMessage: "",
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,

  reducers: {
    fetchCategoriesRequest: (state) => {
      state.status = c.LOADING;
    },

    fetchCategoriesSuccess: (state, action) => {
      state.status = c.SUCCESS;
      state.data = action.payload;
    },

    fetchCategoriesFail: (state) => {
      state.status = c.FAIL;
    },
  },
});

export const actions = { ...categoriesSlice.actions };

export default categoriesSlice.reducer;
