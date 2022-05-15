import { createSlice } from "@reduxjs/toolkit";

import { LOADING_STATUS } from "../../constants";

const initialState = {
  currentPage: "home",
  hotProducts: {
    data: [],
    status: LOADING_STATUS.LOADING,
  },
  banners: {
    data: [],
    status: LOADING_STATUS.LOADING,
  },
};

const pageSlice = createSlice({
  name: "page",
  initialState,

  reducers: {
    fetchBannersRequest: (state) => {
      state.status = LOADING_STATUS.LOADING;
    },

    fetchBannersSuccess: (state, action) => {
      console.log(action);
      state.banners.status = LOADING_STATUS.SUCCESS;
      state.banners.data = action.payload;
    },

    fetchBannersFail: (state) => {
      state.status = LOADING_STATUS.FAIL;
    },
  },
});

export const actions = { ...pageSlice.actions };

export default pageSlice.reducer;
