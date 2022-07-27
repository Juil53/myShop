import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { USER_ACTIONS } from "../../../../constants";
import { navigate } from "../../../../utils/routing";
import { actions as cartActions } from "../../../../store/cart/slice";
import { clientActions } from "../../../../store/clients/slice";

const SelectionPopup = (props) => {
  const { closePopup, data } = props;
  const { message, actionType, detail } = data || [];
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const confirmActions = {
    "delete cart": (detail) => {
      dispatch(cartActions.updateCartRequest({ product: detail.product }));
      closePopup();
    },
    "sign in": () => {
      navigate(dispatch, navigator, "/sign");
      closePopup();
    },
    "delete address": (detail) => {
      dispatch(
        clientActions.updateRequest({ data: detail.address, uid: detail.uid })
      );

      closePopup();
    },
  };

  return (
    <div className="modal center">
      <div className="selection-popup">
        <div className="selection-popup__title">
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
