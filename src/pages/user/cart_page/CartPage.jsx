import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CART_ACTIONS, LOADING_STATUS, POPUP } from "../../../constants";
import { selectCart } from "../../../store/cart/selectors";
import { clone, utils } from "../../../utils";
import { actions } from "../../../store/page/slice";
import CartRow from "./child/CartRow";

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  useEffect(() => {
    if (cart.status === LOADING_STATUS.IDLE) {
      dispatch({ type: CART_ACTIONS.GET_CART });
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
          product: newProduct,
        },
      })
    );
  }

  const createTableItem = (data) => {
    if (data && data.length && data.length > 0) {
      return data.map((v, i) => (
        <CartRow
          key={"cart-row" + v.id + i}
          data={v}
          actionDelete={() => {
            deleteItem(v);
          }}
        />
      ));
    }
  };

  return (
    <div className="cart-page">
      <ul className="breadcums">
        <li>
          <a>Home</a>
          <span>/</span>
        </li>
        <li>Cart</li>
      </ul>
      <div className="title">Your cart</div>
      {cart.data &&
      cart.data.productList &&
      cart.data.productList.length > 0 ? (
        <div className="has-cart">
          <table className="cart-table">
            <thead className="cart-header">
              <tr>
                <th className="image">Image</th>
                <th className="name">Name</th>
                <th className="price">Price</th>
                <th className="quantity">Quantity</th>
                <th className="amount">Amount</th>
                <th className="delete">Delete</th>
              </tr>
            </thead>
            <tbody className="cart-data">
              {cart.data ? createTableItem(cart.data.productList) : <></>}
            </tbody>
          </table>
          <div className="total-money row">
            Total money:
            <span>
              {cart.data ? utils.priceBreak(cart.data.totalAmount) : "0 "}₫
            </span>
          </div>
          <div className="payment-container row">
            <a className="payment-btn button-style" href="/payment">
              Payment
            </a>
          </div>
        </div>
      ) : (
        <div className="no-cart">
          <img src="/img/empty_cart.png" alt="" />
          <div className="text">Your cart is empty</div>
          <a href="home" className="button-style keep-shopping-btn">
            Keep shopping
          </a>
        </div>
      )}
    </div>
  );
};
export default CartPage;
