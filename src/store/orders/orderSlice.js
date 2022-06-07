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
    keyword:null
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

    submitOrderFailed(state,action){
        state.loading = false;
        state.error = action.payload
    },

    getKeyword(state,action){
      state.keyword = action.payload
    }
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
  submitOrderRequest,
  submitOrderSuccess,
  submitOrderFailed,
  getKeyword
} = orderSlice.actions;

export default orderSlice.reducer;
