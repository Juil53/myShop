export const constant = {
  //loading status
  IDLE: "IDLE",
  SUCCESS: "SUCCESS",
  LOADING: "LOADING",
  FAIL: "FAIL",

  // base url
  API_URL: "http://localhost:3000",
  //pop up
  NO_POPUP: "NO_POPUP",
  CHANGE_POPUP: "CHANGE_POPUP",
  PRODUCT_INFO_POPUP: "PRODUCT_INFO_POPUP",
  //product
  GET_PRODUCTS_SUCCESS: "GET_PRODUCTS_SUCCESS",
  GET_PRODUCTS_FAILURE: "GET_PRODUCTS_FAILURE",
  //language
  ENG: "ENG",
  VI: "VI",
  CHANGE_LANGUAGE: "CHANGE_LANGUAGE",
  //category
  GET_CATEGORY_SUCCESS: "GET_CATEGORY_SUCCESS",
  //home
  GET_HOME_SUCCESS: "GET_HOME_SUCCESS",
};

export const LOADING_STATUS = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  FAIL: "FAIL",
  UPDATING: "UPDATING",
};

export const PAGE_ACTIONS = {
  GET_BANNERS: "GET_BANNERS",
};

export const POPUP = {
  NO_POPUP: "NO_POPUP",
  PRODUCT_INFO_POPUP: "PRODUCT_INFO_POPUP",
  ADD_CART_POPUP: "ADD_CART_POPUP",
  SELECTION_POPUP: "SELECTION_POPUP",
  WAITING_POPUP: "WAITING_POPUP",
  ADD_ADDRESS_POPUP: "ADD_ADDRESS_POPUP",
  MESSAGE_POPUP: "MESSAGE_POPUP",
};

export const PRODUCT_ACTIONS = {
  SEARCH_PRODUCT: "SEARCH_PRODUCT",
  GET_HOT_PRODUCTS: "GET_HOT_PRODUCTS",
  GET_ALL_PRODUCTS: "GET_ALL_PRODUCTS",
  GET_NEW_PRODUCTS: "GET_NEW_PRODUCTS",
  GET_BEST_SELLING_PRODUCTS: "GET_BEST_SELLING_PRODUCTS",
};

export const CATEGORY_ACTIONS = {
  GET_ALL_CATEGORIES: "GET_ALL_CATEGORIES",
  GET_SELECTED_CATEGORY: "GET_SELECTED_CATEGORY",
  GET_SELECTED_SUB_CATEGORY: "GET_SELECTED_SUB_CATEGORY",
};

export const CART_ACTIONS = {
  GET_CART: "GET_CART",
  ADD_CART: "ADD_CART",
  UPDATE_CART: "UPDATE_CART",
  DELETE_CART: "DELETE_CART",
};

export const USER_ACTIONS = {
  SIGNIN_USER: "SIGN_USER",
  GET_USER_INFO: "GET_USER_INFO",
  SIGNUP_USER: "SIGNUP_USER",
  SIGNIN_USER_WITH_GOOGLE: "SIGNIN_USER_WITH_GOOGLE",
  SIGNIN_USER_WITH_FACEBOOK: "SIGNIN_USER_WITH_FACEBOOK",
  SIGNIN_ADMIN: "SIGNIN_ADMIN",
  SIGNOUT_USER: "SIGNOUT_USER",
  UPDATE_USER_INFO: "UPDATE_USER_INFO",
  UPDATE_USER_PASSWORD: "UPDATE_USER_PASSWORD",
};

export const ROWS_PER_PAGE = 10;
