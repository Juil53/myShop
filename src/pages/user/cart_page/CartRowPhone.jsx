import { useState } from "react";
import { useDispatch } from "react-redux";
import Quantity from "../../../components/user/quantity/Quantity";
import { clone, utils } from "../../../utils";
import { actions as cartActions } from "../../../store/cart/slice";

const CartRowPhone = (props) => {
  const { data, actionDelete } = props;
  const [number, setNumber] = useState(data.quantity);
  const dispatch = useDispatch();

  function updateItem(number) {
    const newProduct = clone(data);

    newProduct.quantity = number;

    if (number !== 0) {
      dispatch(cartActions.updateCartRequest({ product: newProduct }));
    } else {
      actionDelete();
    }
  }

  const createOptionItem = (data) => {
    if (data && data.length && data.length > 0) {
      return data.map((v, i) => <span key={"option" + i}> {v} </span>);
    }
  };

  return (
    <tr className="cart-item-phone">
      <td>
        <div className="image">
          <img src={data.image} alt="" />
        </div>
      </td>
      <td className="detail">
        <div className="name">
          <a href="">{data.name}</a>
          {Object.values(data.optionSelected).length > 0 && (
            <div className="more">
              Type: {createOptionItem(Object.values(data.optionSelected))}
            </div>
          )}
        </div>
        <div className="quantity">
          <Quantity
            value={number}
            changeValue={setNumber}
            quantity={data.quantity}
            available={data.available}
            type="update"
            updateItem={updateItem}
          />
        </div>
        <div className="price">{utils.priceBreak(data.totalPrice)}₫</div>
        <button className="delete-btn" onClick={actionDelete}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  );
};

export default CartRowPhone;
