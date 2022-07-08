import { useState } from "react";

import { clone, utils } from "../../../../../utils";
import { useDispatch } from "react-redux";
import { CART_ACTIONS } from "../../../../../constants";
import Quantity from "../../../../user/quantity/Quantity";

const CartItem = (props) => {
  const { data, actionDelete } = props;
  const [number, setNumber] = useState(data.quantity);
  const dispatch = useDispatch();

  function updateItem(number) {
    const newProduct = clone(data);

    newProduct.quantity = number;

    if (number !== 0) {
      dispatch({
        type: CART_ACTIONS.UPDATE_CART,
        product: newProduct,
      });
    } else {
      actionDelete();
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
        <Quantity
          value={number}
          available={data.available}
          changeValue={setNumber}
          type="update"
          quantity={data.quantity}
          updateItem={updateItem}
        />
      </div>
      <div className="data amount">{utils.priceBreak(data.totalPrice)}₫</div>
      <div className="delete-btn" onClick={actionDelete}>
        <i className="fa-solid fa-trash"></i>
      </div>
    </div>
  );
};

export default CartItem;
