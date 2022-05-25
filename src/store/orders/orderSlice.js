import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderData: null,
    orderDataPagination: null,
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

    getOrderPaginationRequest(state, action) {
      state.loading = true;
    },

    getOrderPaginationSuccess(state, action) {
      state.loading = false;
      state.orderDataPagination = action.payload;
    },

    getOrderPaginationFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getOrderRequest,
  getOrderSuccess,
  getOrderFailed,
  getOrderPaginationRequest,
  getOrderPaginationSuccess,
  getOrderPaginationFailed,
} = orderSlice.actions;

export default orderSlice.reducer;
