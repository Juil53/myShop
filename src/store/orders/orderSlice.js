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
      address: {},
    },
    addOrder: {
      status: LOADING_STATUS.IDLE,
    },
    orderByClient: {
      status: LOADING_STATUS.IDLE,
      data: [],
    },
    payUrl: {
      status: LOADING_STATUS.IDLE,
      data: "",
    },
    orderById: {
      status: LOADING_STATUS.IDLE,
      data: {},
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

    getOrderDetailRequest(state, action) {
      state.loading = true;
    },
    getOrderDetailSuccess(state, action) {
      state.loading = false;
      state.orderDetail = action.payload;
    },
    getOrderDetailFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
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
        const index = orderList.findIndex((order) => order.id === action.payload.id);
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

    addOrderRequest: (state) => {
      state.addOrder.status = LOADING_STATUS.LOADING;
    },

    addOrderSuccess: (state) => {
      state.addOrder.status = LOADING_STATUS.SUCCESS;
    },

    addOrderFail: (state) => {
      state.addOrder.status = LOADING_STATUS.FAIL;
    },

    getPayUrlRequest: (state) => {
      state.payUrl.status = LOADING_STATUS.LOADING;
    },

    getPayUrlSuccess: (state, { payload: { payUrl } }) => {
      state.payUrl.status = LOADING_STATUS.SUCCESS;
      state.payUrl.data = payUrl;
    },

    getPayUrlFail: (state) => {
      state.payUrl.status = LOADING_STATUS.FAIL;
    },

    getOrderByClientRequest: (state) => {
      state.orderByClient.status = LOADING_STATUS.LOADING;
    },

    getOrderByClientSuccess: (state, action) => {
      state.orderByClient.status = LOADING_STATUS.SUCCESS;
      state.orderByClient.data = action.payload;
    },
    getOrderByClientFail: (state) => {
      state.orderByClient.status = LOADING_STATUS.FAIL;
    },

    getOrderByIdRequest: (state) => {
      state.orderById.status = LOADING_STATUS.LOADING;
    },

    getOrderByIdSuccess: (state, action) => {
      state.orderById.status = LOADING_STATUS.SUCCESS;
      state.orderById.data = action.payload;
    },
    getOrderByIdFail: (state) => {
      state.orderById.status = LOADING_STATUS.FAIL;
      state.orderById.data = {};
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
  getOrderDetailRequest,
  getOrderDetailSuccess,
  getOrderDetailFailed,
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
  addOrderRequest,
  addOrderSuccess,
  addOrderFail,
  getPayUrlRequest,
  getPayUrlSuccess,
  getPayUrlFail,
  getOrderByClientRequest,
  getOrderByClientSuccess,
  getOrderByClientFail,
  getOrderByIdRequest,
  getOrderByIdSuccess,
  getOrderByIdFail,
} = orderSlice.actions;

export default orderSlice.reducer;
