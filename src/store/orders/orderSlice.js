import { createSlice } from "@reduxjs/toolkit";
import { LOADING_STATUS } from "../../constants";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderData: [],
    orderDataPagination: null,
    orderDetail: null,
    loading: false,
    error: null,
    orderPagination: null,
    isOpen: false,
    keyword: null,
    status: false,
    orderAddress: {
      status: LOADING_STATUS.IDLE,
      address: {},
    },
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

    updateOrderDetail(state, action) {
      state.orderDetail = action.payload;
    },

    openModal(state, action) {
      state.isOpen = true;
    },

    closeModal(state, action) {
      state.isOpen = false;
    },

    submitOrderRequest(state, action) {
      state.loading = true;
    },

    submitOrderSuccess(state, action) {
      state.loading = false;

      const orderList = [...state.orderData];
      if (action.payload.id) {
        const index = orderList.findIndex(
          (order) => order.id === action.payload.id
        );
        if (index !== -1) {
          //Edit
          orderList[index] = action.payload;
        } else {
          //Add
          orderList.push(action.payload);
        }
      }

      state.orderData = orderList;
    },

    submitOrderFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getKeyword(state, action) {
      state.keyword = action.payload;
    },

    deleteOrderRequest(state) {
      state.status = false;
    },

    deleteOrderSuccess(state, action) {
      state.status = true;
    },

    deleteOrderFailed(state, action) {
      state.status = false;
    },

    resetStatus(state) {
      state.status = false;
    },

    setOrderAddress: (state, action) => {
      state.orderAddress.address = action.payload;
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
  updateOrderDetail,
  openModal,
  closeModal,
  submitOrderRequest,
  submitOrderSuccess,
  submitOrderFailed,
  getKeyword,
  deleteOrderRequest,
  deleteOrderSuccess,
  deleteOrderFailed,
  resetStatus,
  setOrderAddress,
} = orderSlice.actions;

export default orderSlice.reducer;
