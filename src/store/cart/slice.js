import { createSlice } from "@reduxjs/toolkit";

import { LOADING_STATUS } from "../../constants";

const initialState = {
  status: LOADING_STATUS.IDLE,
  data: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    fetchCartRequest: (state) => {
      state.status = LOADING_STATUS.LOADING;
    },

    fetchCartSuccess: (state, action) => {
      state.status = LOADING_STATUS.SUCCESS;
      state.data = action.payload;
    },

    fetchCartFail: (state) => {
      state.status = LOADING_STATUS.FAIL;
    },

    fetchAddCart: (state, action) => {
      state.data = action.payload;
    },

    fetchDeleteCart: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const actions = { ...cartSlice.actions };

export default cartSlice.reducer;
