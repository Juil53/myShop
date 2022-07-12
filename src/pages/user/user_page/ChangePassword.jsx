import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import InputField from "../../../components/input_field/InputField";
import { LOADING_STATUS, POPUP, USER_ACTIONS } from "../../../constants";
import {
  checkMinLength,
  checkPassword,
} from "../../../validation/validateInputField";
import { actions } from "../../../store/page/slice";
import { clientActions } from "../../../store/clients/slice";
import { clientSelector } from "../../../store/clients/selector";
import localStorage from "../../../service/localStorage";

const ChangePassword = () => {
  const [currentPass, setCurrentPass] = useState();
  const [newPass, setNewPass] = useState();
  const [retypePass, setRetypePass] = useState();

  const client = useSelector(clientSelector);
  const [click, setClick] = useState(false);

  const providerID = localStorage.get("providerID");

  const dispatch = useDispatch();

  useEffect(() => {
    if (client.updateStatus === LOADING_STATUS.LOADING && click) {
      dispatch(actions.activePopup({ type: POPUP.WAITING_POPUP }));
    } else if (client.updateStatus === LOADING_STATUS.SUCCESS && click) {
      dispatch(actions.hidePopup(POPUP.WAITING_POPUP));
      dispatch({ type: USER_ACTIONS.SIGNOUT_USER });
      dispatch(
        actions.activePopup({
          type: POPUP.SELECTION_POPUP,
          data: {
            actionType: "sign in",
            message:
              "Your password has been changed. Do you want to sign in again?",
            title: "Information",
          },
        })
      );
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
      checkPassword(newPass) &&
      checkPassword(retypePass)
    ) {
      if (retypePass !== newPass) {
        document.getElementById("user-error_msg").textContent =
          "Password not match. Try again";
      } else {
        dispatch(
          clientActions.updatePasswordRequest({
            currentPass: currentPass,
            newPass: newPass,
          })
        );
      }
    }
  };

  return (
    <>
      {!providerID ? (
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
              needCheck
            />
            <InputField
              type="password"
              required
              title="Retype password"
              id="user-retype_pass"
              onChange={setRetypePass}
              needCheck
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
      ) : (
        <div>This type of account can not change password</div>
      )}
    </>
  );
};

export default ChangePassword;
