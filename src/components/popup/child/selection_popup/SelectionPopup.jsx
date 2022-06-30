import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CART_ACTIONS, USER_ACTIONS } from "../../../../constants";

const SelectionPopup = (props) => {
  const { closePopup, data } = props;
  const { message, actionType, detail } = data || [];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const confirmActions = {
    "delete cart": (detail) => {
      dispatch({ type: CART_ACTIONS.UPDATE_CART, product: detail.product });
      closePopup();
    },
    "sign in": () => {
      navigate("/sign");
    },
    "delete address": (detail) => {
      dispatch({
        type: USER_ACTIONS.UPDATE_USER_INFO,
        data: detail.address,
        uid: detail.uid,
      });
      closePopup();
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
            onClick={() => confirmActions[actionType](detail)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectionPopup;
