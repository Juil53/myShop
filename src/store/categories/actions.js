import { constant } from "../../constants";
import { categoryService } from "../categories/services";

function getAllCategory() {
  return (dispatch) => {
    categoryService.getAllCategory().then((res) => {
      dispatch(success(res));
    });
  };
  function success(data) {
    return { type: constant.GET_CATEGORY, data };
  }
}
export const categoryAction = {
  getAllCategory,
};
