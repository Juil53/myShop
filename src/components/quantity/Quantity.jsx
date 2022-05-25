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
    let tmp = parseInt(e.target.value);
    if (tmp !== number && tmp <= parseInt(quantity)) {
      return setNumber(tmp);
    } else if (tmp > parseInt(quantity)) {
      return setNumber(parseInt(quantity));
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
      <input type="number" value={number} onChange={handleChangeInput} />
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
