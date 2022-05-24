import apiInstance from "../../utils/axios/axiosInstance";
import {
  getOptionsFailed,
  getOptionsRequest,
  getOptionsSuccess,
  submitProductFailed,
  submitProductRequest,
  submitProductSuccess,
} from "./productSlice";

//GET OPTIONS
export const actGetOptions = () => {
  return async (dispatch) => {
    try {
      dispatch(getOptionsRequest());
      const result = await apiInstance.get("options");
      dispatch(getOptionsSuccess(result));
    } catch (error) {
      dispatch(getOptionsFailed(error));
    }
  };
};

//ADD PRODUCT
export const actAddProduct = (product) => {
  return async (dispatch) => {
    try {
      dispatch(submitProductRequest());
      const result = await apiInstance.post("products", product);
      dispatch(submitProductSuccess(result));
      console.log("success!")
    } catch (error) {
      dispatch(submitProductFailed(error));
      console.log("failed!")
    }
  };
};
