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
  extraReducers: {}, //action bat dong bo
});

export default categoriesSlice.reducer;
