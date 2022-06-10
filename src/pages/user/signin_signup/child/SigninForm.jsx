import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LOADING_STATUS, POPUP, USER_ACTIONS } from "../../../../constants";
import { actions } from "../../../../store/page/slice";
import { loginUser } from "../../../../store/user/selectors";

import { checkEmailFormat } from "../../../../utils";

const SigninForm = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector(loginUser);

  const [isShowPassword, setIsShowPassword] = useState("password");

  useEffect(() => {
    if (userLogin.status === LOADING_STATUS.LOADING) {
      dispatch(actions.activePopup({ type: POPUP.WAITING_POPUP }));
    } else if (
      Object.keys(userLogin.data).length !== 0 &&
      userLogin.status === LOADING_STATUS.SUCCESS
    ) {
      dispatch(actions.hidePopup(POPUP.WAITING_POPUP));
      console.log(userLogin.data);
      window.location.href = window.location.origin;
    } else if (userLogin.status === LOADING_STATUS.FAIL) {
      dispatch(actions.hidePopup(POPUP.WAITING_POPUP));
      const errorMsg = document.getElementById("signin-error-msg");
      errorMsg.textContent = userLogin.msg;
    }
  });

  function handleShowPassword() {
    if (isShowPassword === "password") {
      return setIsShowPassword("text");
    } else {
      return setIsShowPassword("password");
    }
  }

  const setEmptyError = (field) => {
    field.setAttribute("data-error", "Fill this field");
  };

  const checkInputValue = (inputField, thisInput) => {
    const field = document.getElementById(inputField);
    const input = document.getElementById(thisInput);
    const value = input.value;

    if (!value) {
      setEmptyError(field);
    } else {
      if (inputField === "signin-email" && !checkEmailFormat(value)) {
        field.setAttribute(
          "data-error",
          "Wrong email format. Please enter a right one"
        );
      }

      if (inputField === "signin-password" && value.length < 6) {
        field.setAttribute(
          "data-error",
          "Password is short. Enter at least 6 characters"
        );
      }
    }
  };

  const handleInputChange = (inputField) => {
    const field = document.getElementById(inputField);
    field.removeAttribute("data-error");
  };

  const handleLogin = async () => {
    const email = document.getElementById("signin-email-ip").value;
    const password = document.getElementById("signin-password-ip").value;
    const errorMsg = document.getElementById("signin-error-msg");

    errorMsg.textContent = "";
    if (!email || !password) {
      errorMsg.textContent = "Please enter all information required";
    } else {
      if (password.length < 6) {
        errorMsg.textContent = "Password is short";
      } else if (!checkEmailFormat(email)) {
        errorMsg.textContent = "Email is wrong format";
      } else {
        dispatch({
          type: USER_ACTIONS.LOGIN_USER,
          email: email,
          password: password,
        });
      }
    }
  };

  return (
    <div className="login-form form">
      <div className="input-field" id="signin-email">
        <i className="fa-solid fa-user"></i>
        <input
          placeholder="Your email"
          id="signin-email-ip"
          onChange={() => handleInputChange("signin-email")}
          onBlur={() => checkInputValue("signin-email", "signin-email-ip")}
        />
      </div>
      <div className="input-field" id="signin-password">
        <i className="fa-solid fa-lock"></i>
        <input
          placeholder="Your password"
          id="signin-password-ip"
          type={isShowPassword}
          onChange={() => handleInputChange("signin-password")}
          onBlur={() =>
            checkInputValue("signin-password", "signin-password-ip")
          }
        />
        <i
          className={
            isShowPassword === "text"
              ? "fa-solid fa-eye showpass"
              : "fa-solid fa-eye-slash showpass"
          }
          onClick={handleShowPassword}
        />
      </div>
      <span className="error-msg" id="signin-error-msg"></span>
      <button className="button-style login-btn" onClick={handleLogin}>
        Sign in
      </button>
      <span className="social-text">Or sign in with</span>
      <div className="social-media row">
        <a href="#">
          <i className="fa-brands fa-facebook"></i>
        </a>
        <a href="#">
          <i className="fa-brands fa-google"></i>
        </a>
      </div>
    </div>
  );
};

export default SigninForm;
