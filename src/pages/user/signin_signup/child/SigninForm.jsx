import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LOADING_STATUS, POPUP, USER_ACTIONS } from "../../../../constants";
import { clientSelector } from "../../../../store/clients/selector";
import InputField from "../../../../components/input_field/InputField";
import { actions } from "../../../../store/page/slice";

import { checkEmailFormat } from "../../../../validation/validateInputField";

const SigninForm = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector(clientSelector);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [isClick, setIsClick] = useState(false);

  useEffect(() => {
    if (userLogin.status === LOADING_STATUS.LOADING && isClick) {
      dispatch(actions.activePopup({ type: POPUP.WAITING_POPUP }));
    } else if (userLogin.status === LOADING_STATUS.SUCCESS && isClick) {
      dispatch(actions.hidePopup(POPUP.WAITING_POPUP));
      window.location.href = window.location.origin;
    } else if (userLogin.status === LOADING_STATUS.FAIL && isClick) {
      dispatch(actions.hidePopup(POPUP.WAITING_POPUP));
      const errorMsg = document.getElementById("signin-error-msg");
      errorMsg.textContent = userLogin.msg;
    }
  });

  const handleLogin = async () => {
    setIsClick(true);
    const errorMsg = document.getElementById("signin-error-msg");

    errorMsg.textContent = "";
    if (!email || !password) {
      errorMsg.textContent = "Please enter all information required";
    } else {
      if (!checkEmailFormat(email)) {
        errorMsg.textContent = "Invalid email";
      } else {
        dispatch({
          type: USER_ACTIONS.SIGNIN_USER,
          email: email,
          password: password,
        });
      }
    }
  };

  const handleSigninWithGoogle = () => {
    setIsClick(true);
    dispatch({
      type: USER_ACTIONS.SIGNIN_USER_WITH_GOOGLE,
    });
  };

  const handleSigninWithFacebook = () => {
    setIsClick(true);
    dispatch({ type: USER_ACTIONS.SIGNIN_USER_WITH_FACEBOOK });
  };

  return (
    <div className="login-form form">
      <InputField
        type="email"
        id="signin-email"
        title="Your email"
        onChange={setEmail}
        required
      />
      <InputField
        type="password"
        id="signin-password"
        title="Password"
        onChange={setPassword}
        required
      />
      <span className="error-msg" id="signin-error-msg"></span>
      <button className="button-style login-btn" onClick={handleLogin}>
        Sign in
      </button>
      <span className="social-text">Or sign in with</span>
      <div className="social-media row">
        <button onClick={handleSigninWithFacebook}>
          <i className="fa-brands fa-facebook"></i>
        </button>
        <button onClick={handleSigninWithGoogle}>
          <i className="fa-brands fa-google"></i>
        </button>
      </div>
    </div>
  );
};

export default SigninForm;
