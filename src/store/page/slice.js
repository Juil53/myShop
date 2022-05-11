import { createSlice } from "@reduxjs/toolkit";
import { constant as c } from "../../constants";

const initialState = {
  currentPage: "home",
  banners: {
    data: [],
    status: c.LOADING,
  },
};

const pageSlice = createSlice({
  name: page,
  initialState,

  reducers: {
    changePage: (state, action) => {
      state.currentPage = action.payload;
    },
  },

  extraReducers: {},
});
1;
export default pageSlice.reducer;
