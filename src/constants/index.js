export const constant = {
  //check name
  validName: "valid",
  longName: "long",
  shortName: "short",

  // base url
  API_URL: "http://localhost:3000",

  //language
  ENG: "ENG",
  VI: "VI",
  CHANGE_LANGUAGE: "CHANGE_LANGUAGE",

  //order status
  pending: "Pending",
  succeed: "Succeed",
  cancel: "Cancel",
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
  CHOOSE_ADDRESS_POPUP: "CHOOSE_ADDRESS_POPUP",
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
  ADMIN_SIGNIN: "ADMIN_SIGNIN",
  SIGNOUT_USER: "SIGNOUT_USER",
  UPDATE_USER_INFO: "UPDATE_USER_INFO",
  UPDATE_USER_PASSWORD: "UPDATE_USER_PASSWORD",
  ADMIN_SIGNOUT: "ADMIN_SIGNOUT",
};

export const ROWS_PER_PAGE = 10;
