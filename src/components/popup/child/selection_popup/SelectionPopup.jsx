import { useDispatch } from "react-redux";
import { CART_ACTIONS } from "../../../../constants";

const SelectionPopup = (props) => {
  const { closePopup, data } = props;
  const { message, product, actionType } = data || [];
  const dispatch = useDispatch();

  const confirmActions = {
    "delete cart": (product) => {
      dispatch({ type: CART_ACTIONS.UPDATE_CART, product: product });
      closePopup();
    },
    "sign in": () => {
      window.location.href = window.location.origin + "/sign";
    },
  };

  return (
    <div className="modal center">
      <div className="selection-popup">
        <div className="title">
          <i className="fa-solid fa-circle-question"></i>
        </div>
        <div className="message">{message}</div>
        <div className="function row">
          <button className="cancel-btn" onClick={closePopup}>
            Cancel
          </button>
          <button
            className="confirm-btn button-style"
            onClick={() => confirmActions[actionType](product)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectionPopup;
