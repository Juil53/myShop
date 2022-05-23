import { createSlice } from "@reduxjs/toolkit";

import { LOADING_STATUS } from "../../constants";

const initialState = {
  currentPage: "home",
  hotProducts: {
    data: [],
    status: LOADING_STATUS.IDLE,
  },
  banners: {
    data: [],
    status: LOADING_STATUS.IDLE,
  },
  popup: {
    active: [],
  },
};

const pageSlice = createSlice({
  name: "page",
  initialState,

  reducers: {
    fetchBannersRequest: (state) => {
      state.banners.status = LOADING_STATUS.LOADING;
    },

    fetchBannersSuccess: (state, action) => {
      console.log(action);
      state.banners.status = LOADING_STATUS.SUCCESS;
      state.banners.data = action.payload;
    },

    fetchBannersFail: (state) => {
      console.log("fail");

      state.banners.status = LOADING_STATUS.FAIL;
    },

    activePopup: (state, action) => {
      const index = state.popup.active.findIndex(
        (v) => v.type === action.payload.type
      );
      if (index !== -1) return;
      state.popup.active.push({
        type: action.payload.type,
        data: action.payload.data,
      });
    },

    hidePopup: (state, action) => {
      const index = state.popup.active.findIndex(
        (v) => v.type === action.payload
      );
      if (index === -1) return;
      state.popup.active.splice(index, 1);
    },
  },
});

export const actions = { ...pageSlice.actions };

export default pageSlice.reducer;
