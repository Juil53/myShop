import { useState } from "react";
const Quantity = (props) => {
  const { value, quantity } = props;
  const [number, setNumber] = useState(value);

  function handleDecrease() {
    if (number - 1 > 0) {
      return setNumber(number - 1);
    }
  }

  function handleIncrease() {
    if (number + 1 <= quantity) {
      return setNumber(number + 1);
    }
  }

  function handleChangeInput(e) {
    let tmp = parseInt(e.target.value);
    if (tmp !== number && tmp <= quantity) {
      return setNumber(tmp);
    } else if (tmp > quantity) {
      return setNumber(quantity);
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
        disabled={number + 1 > quantity}
      >
        +
      </button>
    </div>
  );
};

export default Quantity;
