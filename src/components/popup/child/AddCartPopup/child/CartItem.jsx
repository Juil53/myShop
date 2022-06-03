import { useState } from "react";

import { utils } from "../../../../../utils";

const CartItem = (props) => {
  const { data, index, actionDelete } = props;
  const [number, setNumber] = useState(data.quantity);
  const [amount, setAmount] = useState(data.totalPrice);

  function handleDecrease() {
    if (number - 1 > 0) {
      setAmount(utils.calAmount(number - 1, data.priceAfterDiscount));
      return setNumber(number - 1);
    }
  }

  function handleIncrease(quantity) {
    if (number + 1 <= quantity) {
      setAmount(utils.calAmount(number + 1, data.priceAfterDiscount));
      return setNumber(number + 1);
    }
  }

  function handleChangeInput(e) {
    if (e.target.value) {
      let number = parseInt(e.target.value);
      if (number > data.available) {
        setAmount(utils.calAmount(data.available, data.priceAfterDiscount));
        return setNumber(data.available);
      }
      setAmount(utils.calAmount(number, data.priceAfterDiscount));
      return setNumber(number);
    } else {
      return setNumber(e.target.value);
    }
  }

  function checkValue(quantity, price) {
    if (!number || number === 0) {
      setAmount(utils.calAmount(quantity, price));
      setNumber(quantity);
    }
  }

  const createOptionItem = (data) => {
    if (data && data.length && data.length > 0) {
      return data.map((v, i) => <span key={"option" + i}> {v} </span>);
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
          <div className="more">
            Type:
            {Object.values(data.optionSelected) &&
              createOptionItem(Object.values(data.optionSelected))}
          </div>
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
      <div className="data amount">{utils.priceBreak(amount)}₫</div>
      <div
        className="delete-btn"
        onClick={() => {
          actionDelete(index);
        }}
      >
        <i className="fa-solid fa-trash"></i>
      </div>
    </div>
  );
};

export default CartItem;
