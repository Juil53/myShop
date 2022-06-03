import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Quantity from "../../../components/quantity/Quantity";
import { CART_ACTIONS, LOADING_STATUS, POPUP } from "../../../constants";
import { selectCart } from "../../../store/cart/selectors";
import { utils } from "../../../utils";
import localStorage from "../../../service/localStorage";
import { actions } from "../../../store/page/slice";

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  useEffect(() => {
    if (cart.status === LOADING_STATUS.IDLE) {
      dispatch({ type: CART_ACTIONS.GET_CART });
    }
  });

  function deleteItem(item) {
    dispatch(
      actions.activePopup({
        type: POPUP.SELECTION_POPUP,
        data: {
          title: "Delete product",
          message: "Do you want to continue removing this item from your cart?",
          action: () => {
            const currentCart = localStorage.get("cart");
            const index = currentCart.productList.indexOf(item);

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

  const createOptionItem = (data) => {
    if (data && data.length && data.length > 0) {
      return data.map((v, i) => <span key={"option" + i}> {v} </span>);
    }
  };

  const createTableItem = (data) => {
    if (data && data.length && data.length > 0) {
      return data.map((v, i) => (
        <tr className="cart-item" key={"cart-table-item" + v + i}>
          <td>
            <div className="image">
              <img src={v.image} alt="" />
            </div>
          </td>
          <td className="name">
            <a href="">{v.name}</a>
            <div className="more">
              Type:
              {Object.values(v.optionSelected) &&
                createOptionItem(Object.values(v.optionSelected))}
            </div>
          </td>
          <td>{utils.priceBreak(v.priceAfterDiscount)}₫</td>
          <td className="quantity">
            <Quantity value={v.quantity} quantity="10" />
          </td>
          <td>{utils.priceBreak(v.totalPrice)}₫</td>
          <td className="delete">
            <button
              className="delete-btn"
              onClick={() => {
                deleteItem(v);
              }}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
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
  );
};
export default CartPage;
