import { createSlice } from "@reduxjs/toolkit";

import { LOADING_STATUS, POPUP } from "../../constants";

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
    type: POPUP.NO_POPUP,
    additionalInfo: {},
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

    changePopup: (state, action) => {
      state.popup.type = action.payload.type;
      state.popup.additionalInfo = action.payload.additionalInfo
        ? action.payload.additionalInfo
        : {};
      console.log(action);
    },
  },
});

export const actions = { ...pageSlice.actions };

export default pageSlice.reducer;
