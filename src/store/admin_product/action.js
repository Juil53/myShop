import apiInstance from "../../utils/axios/axiosInstance";
import { getOptionsFailed, getOptionsRequest, getOptionsSuccess } from "./productSlice";

//GET OPTIONS
export const actGetOptions = () => {
  return async (dispatch) => {
    try {
      dispatch(getOptionsRequest());
      const result = await apiInstance.get("options");
      dispatch(getOptionsSuccess(result))
    } catch (error) {
      dispatch(getOptionsFailed(error))
    }
  }
}