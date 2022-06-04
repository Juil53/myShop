import { createSlice, current } from "@reduxjs/toolkit";

import { clone } from "../../utils";
import { LOADING_STATUS } from "../../constants";
import localStorage from "../../service/localStorage";

const initialState = {
  status: LOADING_STATUS.IDLE,
  data: {
    productList: [],
    totalAmount: 0,
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    fetchCartRequest: (state) => {
      state.status = LOADING_STATUS.LOADING;
    },

    fetchCartSuccess: (state, action) => {
      state.status = LOADING_STATUS.SUCCESS;
      state.data = action.payload;
    },

    fetchCartFail: (state) => {
      state.status = LOADING_STATUS.FAIL;
    },

    fetchAddCart: (state, action) => {
      state.data = handleAddCart(state.data, action.payload);
    },

    updateCart: (state, action) => {
      state.data = handleUpdateCart(state.data, action.payload);
    },
  },
});

const calTotal = (cart) => {
  return cart.productList.reduce((pre, cur) => pre + cur.totalPrice, 0);
};

const handleAddCart = (currentCart, { product }) => {
  const newCart = clone(currentCart);

  if (newCart && newCart.productList && newCart.productList.length === 0) {
    newCart.productList.push(product);
  } else {
    const sameProduct = newCart.productList.filter((v) => v.id === product.id);

    if (sameProduct.length > 0) {
      if (Object.keys(product.optionSelected).length > 0) {
        const sameOption = sameProduct.filter(
          (v) =>
            JSON.stringify(v.optionSelected) ===
            JSON.stringify(product.optionSelected)
        );

        if (sameOption.length > 0) {
          sameOption[0].quantity = sameOption[0].quantity + product.quantity;
          sameOption[0].totalPrice =
            sameOption[0].quantity * product.priceAfterDiscount;
        } else {
          newCart.productList.push(product);
        }
      } else {
        sameProduct[0].quantity = sameProduct[0].quantity + product.quantity;
        sameProduct[0].totalPrice =
          sameProduct[0].quantity * product.priceAfterDiscount;
      }
    } else {
      newCart.productList.push(product);
    }
  }

  newCart.totalAmount = calTotal(newCart);

  localStorage.set("cart", newCart);
  return newCart;
};

const handleUpdateCart = (currentCart, { product }) => {
  console.log(product.quantity);
  const newCart = clone(currentCart);

  const sameProduct = newCart.productList.filter(
    (v) => v.cartItemID === product.cartItemID
  );

  if (sameProduct.length > 0) {
    if (product.quantity === 0) {
      const index = newCart.productList.indexOf(sameProduct[0]);
      newCart.productList.splice(index, 1);
    } else {
      sameProduct[0].quantity = product.quantity;
      sameProduct[0].totalPrice =
        sameProduct[0].quantity * product.priceAfterDiscount;

      newCart.totalAmount = calTotal(newCart);
    }
  }

  localStorage.set("cart", newCart);
  return newCart;
};

export const actions = { ...cartSlice.actions };

export default cartSlice.reducer;
