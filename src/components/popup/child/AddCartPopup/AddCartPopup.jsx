import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CART_ACTIONS, LOADING_STATUS, POPUP } from "../../../../constants";

import { utils } from "../../../../utils";
import { selectCart } from "../../../../store/cart/selectors";
import localStorage from "../../../../service/localStorage";
import { actions } from "../../../../store/page/slice";
import CartItem from "./child/CartItem";

const AddCartPopup = (props) => {
  const { closePopup, data } = props;
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  useEffect(() => {
    if (cart.status === LOADING_STATUS.IDLE) {
      dispatch({ type: CART_ACTIONS.GET_CART });
    }
  });

  function deleteItem(index) {
    dispatch(
      actions.activePopup({
        type: POPUP.SELECTION_POPUP,
        data: {
          title: "Delete product",
          message: "Do you want to continue removing this item from your cart?",
          action: () => {
            const currentCart = localStorage.get("cart");

            if (currentCart.productList.length > 0) {
              currentCart.productList.splice(index, 1);
            } else {
              currentCart.productList = [];
            }

            if (
              currentCart.productList.length &&
              currentCart.productList.length >= 0
            ) {
              currentCart.totalAmount = currentCart.productList.reduce(
                (pre, cur) => pre + cur.totalPrice,
                0
              );
              dispatch({ type: CART_ACTIONS.ADD_CART, cart: currentCart });
            } else {
              dispatch({ type: CART_ACTIONS.DELETE_CART });
            }

            dispatch(actions.hidePopup(POPUP.SELECTION_POPUP));
          },
        },
      })
    );
  }

  const createCartItem = (data) => {
    if (data && data.length && data.length >= 1) {
      return data.map((v, i) => {
        return (
          <CartItem
            data={v}
            index={i}
            actionDelete={deleteItem}
            key={"cart_item" + v.id + JSON.stringify(v.optionSelected)}
          />
        );
      });
    }
  };

  return (
    <div className="modal center">
      <div className="popup-add-cart">
        <div className="add-cart__title row">
          <i className="fa-solid fa-circle-check"></i>
        </div>
        <div className="cart-info row">
          <span>{data.name}</span> added to your cart
        </div>
        <div className="cart-status">
          {cart.data &&
            cart.data.productList &&
            cart.data.productList.length &&
            cart.data.productList.length > 0 && (
              <span>{cart.data.productList.length} </span>
            )}
          products in your cart
        </div>
        <div className="add-cart__content">
          <div className="product-header row">
            <div className="title product-info">Product</div>
            <div className="title price">Price</div>
            <div className="title quantity">Quantity</div>
            <div className="title amount">Amount</div>
          </div>
          <div className="product-list">
            {cart.data ? createCartItem(cart.data.productList) : <></>}
          </div>
        </div>
        <div className="add-cart__footer row">
          <div className="total-money">
            Total money:{" "}
            <span>
              {cart.data ? utils.priceBreak(cart.data.totalAmount) : "0 "}₫
            </span>
          </div>
        </div>
        <div className="order-container">
          <button className="back-btn" onClick={closePopup}>
            Back
          </button>
          <button className="button-style order-btn">Order</button>
        </div>
      </div>
    </div>
  );
};

export default AddCartPopup;
