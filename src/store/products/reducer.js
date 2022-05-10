import { constant } from "../../constants";

const initialState = {
  products: {
    status: constant.LOADING,
  },
};

export function products(state = initialState, action) {
  switch (action.type) {
    case constant.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: {
          status: constant.SUCCESS,
          data: action.data,
        },
      };

    default:
      return state;
  }
}
