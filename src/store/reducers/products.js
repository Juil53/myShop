const initialState = {
  products: {
    status: "LOADING",
  },
};
export function product(state = initialState, action) {
  switch (action.type) {
    case "GET_PRODUCTS_SUCCESS":
      return {
        ...state,
        products: {
          status: "SUCCESS",
          data: action.data,
        },
      };
  }
}
