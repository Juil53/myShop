import { useState } from "react";
import { useDispatch } from "react-redux";
import Quantity from "../../../../components/quantity/Quantity";
import { CART_ACTIONS } from "../../../../constants";
import { clone, utils } from "../../../../utils";

const CartRow = (props) => {
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

  const createOptionItem = (data) => {
    if (data && data.length && data.length > 0) {
      return data.map((v, i) => <span key={"option" + i}> {v} </span>);
    }
  };

  return (
    <tr className="cart-item">
      <td>
        <div className="image">
          <img src={data.image} alt="" />
        </div>
      </td>
      <td className="name">
        <a href="">{data.name}</a>
        {Object.values(data.optionSelected).length > 0 && (
          <div className="more">
            Type: {createOptionItem(Object.values(data.optionSelected))}
          </div>
        )}
      </td>
      <td>{utils.priceBreak(data.priceAfterDiscount)}₫</td>
      <td className="quantity">
        <Quantity
          value={number}
          changeValue={setNumber}
          quantity={data.quantity}
          available={data.available}
          type="update"
          updateItem={updateItem}
        />
      </td>
      <td>{utils.priceBreak(data.totalPrice)}₫</td>
      <td className="delete">
        <button className="delete-btn" onClick={actionDelete}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  );
};

export default CartRow;
