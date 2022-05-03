import { constant } from "../../constants";

const initialState = {
  products: {
    status: "LOADING",
  },
};
export function product(state = initialState, action) {
  switch (action.type) {
    case constant.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: {
          status: "SUCCESS",
          data: action.data,
        },
      };
    default:
      return state;
  }
}
