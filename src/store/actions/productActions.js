import { constant } from "../../constants";
import { productService } from "../services/productService";
function getAllProduct() {
  return (dispatch) => {
    productService.getAllProduct().then((res) => {
      dispatch(success(res));
    });
  };
  function success(data) {
    return { type: constant.GET_PRODUCTS_SUCCESS, data };
  }
}
export const productActions = {
  getAllProduct,
};
