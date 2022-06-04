import { useState } from "react";

import { clone, updateCart, utils } from "../../../../../utils";
import { useDispatch } from "react-redux";
import { CART_ACTIONS } from "../../../../../constants";

const CartItem = (props) => {
  const { data, actionDelete } = props;
  const [number, setNumber] = useState(data.quantity);
  const dispatch = useDispatch();

  function updateItem(number) {
    const newProduct = clone(data);
    newProduct.quantity = number;
    dispatch({
      type: CART_ACTIONS.UPDATE_CART,
      product: newProduct,
    });
  }

  function handleDecrease() {
    if (number - 1 > 0) {
      updateItem(number - 1);
      return setNumber(number - 1);
    }
  }

  function handleIncrease(quantity) {
    if (number + 1 <= quantity) {
      updateItem(number + 1);
      return setNumber(number + 1);
    }
  }

  function handleChangeInput(e) {
    if (e.target.value) {
      let number = parseInt(e.target.value);

      if (number > data.available) {
        return setNumber(data.available);
      }
      return setNumber(number);
    } else {
      return setNumber(e.target.value);
    }
  }

  function checkValue(quantity) {
    if (!number || number === 0) {
      updateItem(quantity);
      return setNumber(quantity);
    } else {
      updateItem(number);
    }
  }

  const createOptionItem = (data) => {
    if (data && data.length && data.length > 0) {
      return data.map((v, i) => <span key={"option" + i}>{v} </span>);
    }
  };

  return (
    <div className="item row">
      <div className="data product-info row">
        <div className="img">
          <img src={data.image} alt="" />
        </div>
        <div className="nameandmore">
          <div className="name">{data.name}</div>
          {Object.values(data.optionSelected).length > 0 && (
            <div className="more">
              Type: {createOptionItem(Object.values(data.optionSelected))}
            </div>
          )}
        </div>
      </div>
      <div className="data price">
        {utils.priceBreak(data.priceAfterDiscount)}₫
      </div>
      <div className="data quantity">
        <div className="quantity-container row">
          <button onClick={handleDecrease} disabled={number - 1 < 1}>
            -
          </button>
          <input
            type="number"
            value={number}
            onChange={handleChangeInput}
            onBlur={() => {
              checkValue(data.quantity, data.priceAfterDiscount);
            }}
          />
          <button
            onClick={() => {
              handleIncrease(data.available, data.priceAfterDiscount);
            }}
            disabled={number + 1 > data.available}
          >
            +
          </button>
        </div>
      </div>
      <div className="data amount">{utils.priceBreak(data.totalPrice)}₫</div>
      <div className="delete-btn" onClick={actionDelete}>
        <i className="fa-solid fa-trash"></i>
      </div>
    </div>
  );
};

export default CartItem;
