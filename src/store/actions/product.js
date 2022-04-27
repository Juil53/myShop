import { product } from "../services/product";

function getProductByID(id) {
  return (dispatch) => {
    product.getProductByID(id);
  };
}
