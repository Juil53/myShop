import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CART_ACTIONS, LOADING_STATUS, POPUP } from "../../../../constants";

import { clone, utils } from "../../../../utils";
import { selectCart } from "../../../../store/cart/selectors";
import { actions } from "../../../../store/page/slice";
import CartItem from "./child/CartItem";

const AddCartPopup = (props) => {
  const { closePopup, data } = props;
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const { productList = [], totalAmount } = cart.data;

  useEffect(() => {
    if (cart.status === LOADING_STATUS.IDLE) {
      dispatch({ type: CART_ACTIONS.GET_CART });
    } else {
      if (productList.length === 0) {
        closePopup();
      }
    }
    if (cart.update === LOADING_STATUS.LOADING) {
      dispatch(actions.activePopup({ type: POPUP.WAITING_POPUP }));
    } else if (cart.update === LOADING_STATUS.SUCCESS) {
      dispatch(actions.hidePopup(POPUP.WAITING_POPUP));
    }
  });

  function deleteItem(product) {
    const newProduct = clone(product);
    newProduct.quantity = 0;

    dispatch(
      actions.activePopup({
        type: POPUP.SELECTION_POPUP,
        data: {
          title: "Delete product",
          message: "Do you want to continue removing this item from your cart?",
          actionType: "delete cart",
          detail: { product: newProduct },
        },
      })
    );
  }

  const createCartItem = (data) => {
    if (data && data.length && data.length >= 1) {
      return data.map((v, i) => {
        return (
          <CartItem
            cart={data}
            data={v}
            index={i}
            actionDelete={() => deleteItem(v)}
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
          {productList && productList.length > 1 ? (
            <span>
              {cart.data.productList.length}
              &nbsp; products in your cart
            </span>
          ) : (
            <span>
              {cart.data.productList.length}
              &nbsp; product in your cart
            </span>
          )}
        </div>
        <div className="add-cart__content">
          <div className="product-header row">
            <div className="title product-info">Product</div>
            <div className="title price">Price</div>
            <div className="title quantity">Quantity</div>
            <div className="title amount">Amount</div>
          </div>
          <div className="product-list">{createCartItem(productList)}</div>
        </div>
        <div className="add-cart__footer row">
          <div className="total-money">
            Total money:{" "}
            <span>{cart.data ? utils.priceBreak(totalAmount) : "0 "}₫</span>
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
