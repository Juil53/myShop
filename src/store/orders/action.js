import apiInstance from "../../utils/axios/axiosInstance";
import { getOrderRequest, getOrderSuccess, getOrderFailed, getOrderPaginationRequest, getOrderPaginationSuccess, getOrderPaginationFailed } from "./orderSlice";

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