import { useState } from "react";
const Quantity = (props) => {
  const { value, quantity } = props;
  const [number, setNumber] = useState(parseInt(value));

  function handleDecrease() {
    if (number - 1 > 0) {
      return setNumber(number - 1);
    }
  }

  function handleIncrease() {
    if (number + 1 <= parseInt(quantity)) {
      return setNumber(number + 1);
    }
  }

  function handleChangeInput(e) {
    if (e.target.value) {
      let number = parseInt(e.target.value);
      if (number > quantity) {
        return setNumber(quantity);
      }
      return setNumber(number);
    } else {
      return setNumber(e.target.value);
    }
  }

  function checkValue() {
    if (!number || number === 0) {
      setNumber(1);
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
        disabled={number + 1 > parseInt(quantity)}
      >
        +
      </button>
    </div>
  );
};

export default Quantity;
