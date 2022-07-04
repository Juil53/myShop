import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../../../components/input_field/InputField";

import { LOADING_STATUS, POPUP, USER_ACTIONS } from "../../../../constants";
import { actions } from "../../../../store/page/slice";
import { loginAdmin } from "../../../../store/users/selector";

import { checkEmailFormat } from "../../../../utils";

const SigninForm = () => {
  const dispatch = useDispatch();
  const adminLogin = useSelector(loginAdmin);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    if (adminLogin.status === LOADING_STATUS.LOADING) {
      dispatch(actions.activePopup({ type: POPUP.WAITING_POPUP }));
    } else if (
      adminLogin.data &&
      Object.keys(adminLogin.data).length !== 0 &&
      adminLogin.status === LOADING_STATUS.SUCCESS
    ) {
      dispatch(actions.hidePopup(POPUP.WAITING_POPUP));
    } else if (adminLogin.status === LOADING_STATUS.FAIL) {
      dispatch(actions.hidePopup(POPUP.WAITING_POPUP));
      const errorMsg = document.getElementById("signin-error-msg");
      errorMsg.textContent = adminLogin.msg;
    }
  });

  const handleLogin = async () => {
    const errorMsg = document.getElementById("signin-error-msg");

    errorMsg.textContent = "";
    if (!email || !password) {
      errorMsg.textContent = "Please enter all information required";
    } else {
      if (!checkEmailFormat(email)) {
        errorMsg.textContent = "Invalid email";
      } else {
        dispatch({
          type: USER_ACTIONS.SIGNIN_ADMIN,
          email: email,
          password: password,
        });
      }
    }
  };

  return (
    <div className="login-form form admin">
      <InputField
        type="email"
        id="signin_admin-email"
        title="Email"
        onChange={setEmail}
        required
      />
      <InputField
        type="password"
        id="signin_admin-password"
        title="Password"
        onChange={setPassword}
        required
      />
      <span className="error-msg" id="signin-error-msg"></span>
      <button className="button-style login-btn admin" onClick={handleLogin}>
        Sign in
      </button>
    </div>
  );
};

export default SigninForm;
