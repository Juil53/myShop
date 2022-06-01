import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderData: null,
    orderDataPagination: null,
    orderDetail: null,
    loading: false,
    error: null,
    orderPagination: null,
    isOpen: false,
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

    getOrderDetail(state, action) {
      state.orderDetail = action.payload;
    },

    openModal(state, action) {
      state.isOpen = true;
    },

    closeModal(state, action) {
      state.isOpen = false;
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
  getOrderDetail,
  openModal,
  closeModal,
} = orderSlice.actions;

export default orderSlice.reducer;
