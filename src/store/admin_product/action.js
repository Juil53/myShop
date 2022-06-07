import apiInstance from "../../utils/axios/axiosInstance";
import {
  getAllProductFailed,
  getAllProductRequest,
  getAllProductSuccess,
  getCategoriesFailed,
  getCategoriesRequest,
  getCategoriesSuccess,
  getOptionsFailed,
  getOptionsRequest,
  getOptionsSuccess,
  getProductPaginationFailed,
  getProductPaginationRequest,
  getProductPaginationSuccess,
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

//GET CATEGORIES
export const actGetCategories = () => {
  return async (dispatch) => {
    try {
      dispatch(getCategoriesRequest());
      const result = await apiInstance.get("categories");
      dispatch(getCategoriesSuccess(result));
    } catch (error) {
      dispatch(getCategoriesFailed(error));
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
      console.log("success!");
    } catch (error) {
      dispatch(submitProductFailed(error));
      console.log("failed!");
    }
  };
};

// GET PRODUCT
export const actGetAllProduct = () => {
  return async (dispatch, getState) => {
    try {
      const { adminProduct = {} } = getState() || {};
      const { products = [] } = adminProduct;
      if (products.length === 0) {
        dispatch(getAllProductRequest());
        const result = await apiInstance.get("products");
        dispatch(getAllProductSuccess(result));
      }
    } catch (error) {
      dispatch(getAllProductFailed(error));
    }
  };
};

// GET PRODUCT DATA PAGINATION
export const actProductPagination = (page, limit) => {
  return async (dispatch) => {
    try {
      dispatch(getProductPaginationRequest());
      const result = await apiInstance.get(
        `products?_page=${page}&_limit=${limit}`
      );
      dispatch(getProductPaginationSuccess(result));
    } catch (error) {
      dispatch(getProductPaginationFailed(error));
    }
  };
};

// DELETE PRODUCT
export const actDeleteProduct = (productId) => {
  return async (dispatch) => {
    try {
      apiInstance.delete(`products/${productId}`);
      alert("Delete Product Success");
      dispatch(actProductPagination());
      dispatch(actGetAllProduct());
    } catch (error) {
      console.log(error);
    }
  };
};
