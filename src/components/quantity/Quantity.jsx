import { useState } from "react";

const Quantity = (props) => {
  const { value, available, changeValue, type, quantity, updateItem } = props;
  const [number, setNumber] = useState(parseInt(value));

  function handleDecrease() {
    if (number - 1 > 0) {
      if (type === "update" && updateItem) {
        updateItem(number - 1);
      }
      changeValue(number - 1);
      return setNumber(number - 1);
    }
  }

  function handleIncrease() {
    if (number + 1 <= parseInt(available)) {
      if (type === "update" && updateItem) {
        updateItem(number + 1);
      }
      changeValue(number + 1);
      return setNumber(number + 1);
    }
  }

  function handleChangeInput(e) {
    if (e.target.value) {
      let number = parseInt(e.target.value);

      if (number > available) {
        changeValue(available);
        return setNumber(available);
      }

      changeValue(number);
      return setNumber(number);
    } else {
      return setNumber(e.target.value);
    }
  }

  function checkValue() {
    if (!number || number === 0) {
      if (type === "update" && updateItem && quantity) {
        updateItem(quantity);
        changeValue(quantity);
        setNumber(quantity);
      } else {
        changeValue(1);
        setNumber(1);
      }
    } else {
      updateItem(number);
    }
  }

  return (
    <div className="quantity-container row">
      <button
        id="descrease-btn"
        onClick={handleDecrease}
        disabled={number - 1 < 1}
      >
        -
      </button>
      <input
        type="number"
        value={number}
        onChange={handleChangeInput}
        onBlur={checkValue}
      />
      <button
        id="increase-btn"
        onClick={handleIncrease}
        disabled={number + 1 > parseInt(available)}
      >
        +
      </button>
    </div>
  );
};

export default Quantity;
