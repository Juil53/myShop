import { createSlice } from "@reduxjs/toolkit";

import { fetchCategories } from "./actions";
import { constant as c } from "../../constants";

const initialState = {
  data: [],
  status: c.LOADING,
  errorMessage: "",
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,

  reducers: {}, // action dong bo

  extraReducers: {
    [fetchCategories.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = c.GET_CATEGORY_SUCCESS;
    },

    [fetchCategories.pending]: (state) => {
      state.status = c.LOADING;
    },
  }, //action bat dong bo
});

export default categoriesSlice.reducer;
