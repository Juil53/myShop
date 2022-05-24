import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderData: null,
    loading: false,
    error: null,
    orderPagination: null,
  },
  reducers: {
    getOrderRequest(state, action) {
      state.loading = true;
    },

    getOrderSuccess(state, action) {
      state.loading = false;
      state.orderData = action.payload;
    },

    getOrderFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getOrderRequest, getOrderSuccess, getOrderFailed } =
  orderSlice.actions;

export default orderSlice.reducer
