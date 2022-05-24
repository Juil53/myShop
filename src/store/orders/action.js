import apiInstance from "../../utils/axios/axiosInstance";
import { getOrderRequest, getOrderSuccess, getOrderFailed } from "./orderSlice";

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
