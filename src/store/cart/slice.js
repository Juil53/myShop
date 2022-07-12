import { createSlice } from "@reduxjs/toolkit";

import { LOADING_STATUS } from "../../constants";
import { handleAddCart, handleUpdateCart } from "./help";

const initialState = {
  status: LOADING_STATUS.IDLE,
  data: {
    productList: [],
    totalAmount: 0,
  },
  update: LOADING_STATUS.IDLE,
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
      state.data = handleAddCart(state.data, action.payload);
    },

    updateCartRequest: (state) => {
      state.update = LOADING_STATUS.LOADING;
    },

    updateCart: (state, action) => {
      state.data = handleUpdateCart(state.data, action.payload);
      state.update = LOADING_STATUS.SUCCESS;
    },
  },
});

export const actions = { ...cartSlice.actions };

export default cartSlice.reducer;
