import { constant } from "../../constants";

const initialState = {
  category: {
    status: constant.LOADING,
  },
};

export function category(state = initialState, action) {
  switch (action.type) {
    case constant.GET_CATEGORY:
      return {
        ...state,
        category: {
          status: constant.SUCCESS,
          data: action.data,
        },
      };

    default:
      return state;
  }
}
