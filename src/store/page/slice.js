import { createSlice } from "@reduxjs/toolkit";
import { constant as c, constant } from "../../constants";
import { fetchHome } from "./action";

const initialState = {
  currentPage: "home",
  banners: {
    data: [],
    status: c.LOADING,
  },
};

const pageSlice = createSlice({
  name: "page",
  initialState,

  reducers: {
    changePage: (state, action) => {
      state.currentPage = action.payload;
    },
  },

  extraReducers: {
    [fetchHome.fulfilled]: (state, action) => {
      state.banners.data = action.payload;
      state.banners.status = constant.GET_HOME_SUCCESS;
    },
  },
});

export default pageSlice.reducer;
