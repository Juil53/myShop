import apiInstance from "../../utils/axios/axiosInstance";
import { getOrderRequest, getOrderSuccess, getOrderFailed, getOrderPaginationRequest, getOrderPaginationSuccess, getOrderPaginationFailed, submitOrderRequest, submitOrderSuccess, submitOrderFailed } from "./orderSlice";

//GET ORDER DATA
export const actGetOrder = () => {
  return async (dispatch) => {
    try {
      dispatch(getOrderRequest());
      const result = await apiInstance.get("orders");
      dispatch(getOrderSuccess(result));
    } catch (error) {
      dispatch(getOrderFailed(error));
    }
  };
};

//GET ORDER DATA PAGINATION
export const actGetOrderPagination = (page, limit) => {
  return async (dispatch) => {
    try {
      dispatch(getOrderPaginationRequest());
      const result = await apiInstance.get(
        `orders?_page=${page}&_limit=${limit}`
      );
      dispatch(getOrderPaginationSuccess(result));
    } catch (error) {
      dispatch(getOrderPaginationFailed(error));
    }
  };
};

// UPDATE ORDER STATUS
export const actUpdateOrderStatus = (order,orderId) => {
  return async (dispatch) => {
    try {
      dispatch(submitOrderRequest());
      const result = await apiInstance.put(`orders/${orderId}`, order);
      dispatch(submitOrderSuccess(result));
      dispatch(actGetOrderPagination())
    } catch (error) {
      dispatch(submitOrderFailed(error));
    }
  };
};

// DELETE ORDER
export const actDeleteOrder = (orderId) => {
  return async (dispatch) => {
    try {
      apiInstance.delete(`orders/${orderId}`);
      alert("Delete Order Success");
      dispatch(actGetOrderPagination());
      dispatch(actGetOrder());
    } catch (error) {
      console.log(error);
    }
  };
};