import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LOADING_STATUS, POPUP, USER_ACTIONS } from "../../../../constants";
import { actions } from "../../../../store/page/slice";
import { loginAdmin } from "../../../../store/users/selector";

import { checkEmailFormat } from "../../../../utils";

const SigninForm = () => {
  const dispatch = useDispatch();
  const adminLogin = useSelector(loginAdmin);

  const [isShowPassword, setIsShowPassword] = useState("password");

  useEffect(() => {
    if (adminLogin.status === LOADING_STATUS.LOADING) {
      dispatch(actions.activePopup({ type: POPUP.WAITING_POPUP }));
    } else if (
      adminLogin.data &&
      Object.keys(adminLogin.data).length !== 0 &&
      adminLogin.status === LOADING_STATUS.SUCCESS
    ) {
      dispatch(actions.hidePopup(POPUP.WAITING_POPUP));
      console.log(adminLogin.data);
      window.location.reload();
    } else if (adminLogin.status === LOADING_STATUS.FAIL) {
      dispatch(actions.hidePopup(POPUP.WAITING_POPUP));
      const errorMsg = document.getElementById("signin-error-msg");
      errorMsg.textContent = adminLogin.msg;
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
    const errorMsg = document.getElementById("signin-error-msg");
    errorMsg.textContent = "";
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
    <div className="login-form form">
      <div className="input-field admin" id="signin-email">
        <i className="fa-solid fa-user"></i>
        <input
          placeholder="Your email"
          id="signin-email-ip"
          onChange={() => handleInputChange("signin-email")}
          onBlur={() => checkInputValue("signin-email", "signin-email-ip")}
        />
      </div>
      <div className="input-field admin" id="signin-password">
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
      <button className="button-style login-btn admin" onClick={handleLogin}>
        Sign in
      </button>
    </div>
  );
};

export default SigninForm;
