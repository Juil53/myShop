import { constant } from "../../constants";
import { productService } from "../services/productService";
function getAllProduct() {
  console.log("hihi");
  return (dispatch) => {
    productService.getAllProduct().then((res) => {
      if (res.status === constant.SUCCESS) {
        dispatch(success(res));
      } else dispatch(failure());
    });
  };
  function success(data) {
    return { type: constant.GET_PRODUCTS_SUCCESS, data };
  }
  function failure(code, msg) {
    return { type: constant.GET_PRODUCTS_FAILURE, code, msg };
  }
}
export const productActions = {
  getAllProduct,
};
