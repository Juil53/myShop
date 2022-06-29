import { clone } from "../../utils";
import localStorage from "../../service/localStorage";

const calTotal = (cart) => {
  return cart.productList.reduce((pre, cur) => pre + cur.totalPrice, 0);
};

export const handleAddCart = (currentCart, { product }) => {
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

export const handleUpdateCart = (currentCart, { product }) => {
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
    }
    newCart.totalAmount = calTotal(newCart);
  }

  localStorage.set("cart", newCart);
  return newCart;
};
