import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { USER_ACTIONS, LOADING_STATUS, POPUP } from "../../../../constants";
import { clientSelector } from "../../../../store/clients/selector";
import { actions } from "../../../../store/page/slice";
import {
  checkEmailFormat,
  checkPhoneFormat,
} from "../../../../validation/validateInputField";
import InputField from "../../../../components/input_field/InputField";

const SignupForm = () => {
  const [isClick, setIsClick] = useState(false);

  const dispatch = useDispatch();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState();

  const userLogin = useSelector(clientSelector);

  useEffect(() => {
    if (userLogin.status === LOADING_STATUS.LOADING && isClick) {
      dispatch(actions.activePopup({ type: POPUP.WAITING_POPUP }));
    } else if (
      userLogin.data &&
      Object.keys(userLogin.data).length !== 0 &&
      userLogin.status === LOADING_STATUS.SUCCESS &&
      isClick
    ) {
      dispatch(actions.hidePopup(POPUP.WAITING_POPUP));
      window.location.href = window.location.origin;
    } else if (userLogin.status === LOADING_STATUS.FAIL && isClick) {
      dispatch(actions.hidePopup(POPUP.WAITING_POPUP));

      const errorMsg = document.getElementById("signup-error-msg");
      errorMsg.textContent = userLogin.msg;
    }
  });

  const handleSignup = async () => {
    setIsClick(true);

    const errorMsg = document.getElementById("signup-error-msg");
    errorMsg.textContent = "";

    if (!name || !email || !phoneNumber || !password) {
      errorMsg.textContent = "Please enter all information required";
    } else {
      if (!checkEmailFormat(email)) {
        errorMsg.textContent = "Invalid email. Please try again";
      } else if (!checkPhoneFormat(phoneNumber)) {
        errorMsg.textContent = "Invalid phone number. Please try again";
      } else {
        const user = {
          displayName: name,
          phoneNumber,
          email,
        };

        dispatch({
          type: USER_ACTIONS.SIGNUP_USER,
          password: password,
          email: email,
          user: user,
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
    <div className="signup-form form">
      <InputField
        type="name"
        id="signup-name"
        title="Your name"
        onChange={setName}
        required
      />
      <InputField
        type="phoneNumber"
        id="signup-phone"
        title="Phone number"
        onChange={setPhoneNumber}
        required
      />
      <InputField
        type="email"
        id="signup-email"
        title="Email address"
        onChange={setEmail}
        required
      />
      <InputField
        type="password"
        id="signup-password"
        title="Password"
        onChange={setPassword}
        required
        needCheck
      />
      <span className="error-msg" id="signup-error-msg"></span>
      <button
        className="button-style signup-btn"
        id="signup-btn"
        onClick={handleSignup}
      >
        Sign up
      </button>
      <span className="social-text">Or sign up with</span>
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

export default SignupForm;
