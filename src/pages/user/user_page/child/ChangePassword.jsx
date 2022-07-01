import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import InputField from "../../../../components/input_field/InputField";
import { LOADING_STATUS, POPUP, USER_ACTIONS } from "../../../../constants";
import { checkMinLength } from "../../../../validation/validate";
import { actions } from "../../../../store/page/slice";
import { clientSelector } from "../../../../store/clients/selector";

const ChangePassword = () => {
  const [currentPass, setCurrentPass] = useState();
  const [newPass, setNewPass] = useState();
  const [retypePass, setRetypePass] = useState();

  const client = useSelector(clientSelector);
  const [click, setClick] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (client.updateStatus === LOADING_STATUS.LOADING && click) {
      dispatch(actions.activePopup({ type: POPUP.WAITING_POPUP }));
    } else if (client.updateStatus === LOADING_STATUS.SUCCESS && click) {
      dispatch(actions.hidePopup(POPUP.WAITING_POPUP));
      dispatch(
        actions.activePopup({
          type: POPUP.MESSAGE_POPUP,
          data: "Your password has been updated successfully",
        })
      );
      setClick(false);
    } else if (client.updateStatus === LOADING_STATUS.FAIL && click) {
      dispatch(actions.hidePopup(POPUP.WAITING_POPUP));

      document.getElementById("user-error_msg").textContent = client.updateMsg;
    }
  });

  const handleChangePassword = () => {
    setClick(true);

    if (
      currentPass &&
      newPass &&
      retypePass &&
      checkMinLength(newPass, 6) &&
      checkMinLength(retypePass, 6)
    ) {
      if (retypePass !== newPass) {
        document.getElementById("user-error_msg").textContent =
          "Password not match. Try again";
      } else {
        dispatch({
          type: USER_ACTIONS.UPDATE_USER_PASSWORD,
          currentPass: currentPass,
          newPass: newPass,
        });
      }
    }
  };

  return (
    <div className="change-password">
      <div className="title">Change password</div>
      <div className="form">
        <InputField
          type="password"
          required
          title="Current password"
          id="user-current_pass"
          onChange={setCurrentPass}
        />
        <InputField
          type="password"
          required
          title="New password"
          id="user-new_pass"
          onChange={setNewPass}
          min="6"
        />
        <InputField
          type="password"
          required
          title="Retype password"
          id="user-retype_pass"
          onChange={setRetypePass}
          min="6"
        />
        <div className="error_msg" id="user-error_msg"></div>
        <button
          className="change-password-btn button-style"
          onClick={handleChangePassword}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
