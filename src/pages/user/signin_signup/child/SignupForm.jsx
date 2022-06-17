import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { USER_ACTIONS, LOADING_STATUS, POPUP } from "../../../../constants";
import { actions } from "../../../../store/page/slice";
import { loginUser } from "../../../../store/users/selector";
import { checkEmailFormat, checkPhoneFormat } from "../../../../utils";

const SignupForm = () => {
  const [isShowPassword, setIsShowPassword] = useState("password");
  const dispatch = useDispatch();
  const userLogin = useSelector(loginUser);
  const [isClick, setIsClick] = useState(false);

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
      console.log(userLogin.data);
      window.location.href = window.location.origin;
    } else if (userLogin.status === LOADING_STATUS.FAIL && isClick) {
      dispatch(actions.hidePopup(POPUP.WAITING_POPUP));
      const errorMsg = document.getElementById("signup-error-msg");
      errorMsg.textContent = userLogin.msg;
    }
  });

  const handleShowPassword = () => {
    if (isShowPassword === "password") {
      return setIsShowPassword("text");
    } else {
      return setIsShowPassword("password");
    }
  };

  const setEmptyError = (f) => {
    f.setAttribute("data-error", "Fill this field");
  };

  const handleInputChange = (f) => {
    const errorMsg = document.getElementById("signup-error-msg");
    errorMsg.textContent = "";
    const field = document.getElementById(f);
    field.removeAttribute("data-error");
  };

  const handleCheckInput = (inputField, thisInput) => {
    const field = document.getElementById(inputField);
    const input = document.getElementById(thisInput);
    const value = input.value;

    if (!value) {
      setEmptyError(field);
    } else {
      if (inputField === "signup-email" && !checkEmailFormat(value)) {
        field.setAttribute("data-error", "Please enter a valid email address");
      }
      if (inputField === "signup-phone" && !checkPhoneFormat(value)) {
        field.setAttribute("data-error", "Please endter a valid phone number");
      }
      if (
        (inputField === "signup-password" || inputField === "signup-retype") &&
        value.length < 6
      ) {
        field.setAttribute(
          "data-error",
          "Password is short. Enter at least 6 characters"
        );
      }
    }
  };

  const handleSignup = async () => {
    setIsClick(true);
    const name = document.getElementById("signup-name-ip").value;
    const email = document.getElementById("signup-email-ip").value;
    const phoneNumber = document.getElementById("signup-phone-ip").value;
    const password = document.getElementById("signup-password-ip").value;
    const retypePassword = document.getElementById("signup-retype-ip").value;
    const errorMsg = document.getElementById("signup-error-msg");
    const field = document.querySelectorAll(".input-field");

    if (!name || !email || !phoneNumber || !password || !retypePassword) {
      errorMsg.textContent = "Please enter all information required";
    } else {
      if (!checkEmailFormat(email)) {
        errorMsg.textContent = "Invalid email. Please try again";
      } else if (!checkPhoneFormat(phoneNumber)) {
        errorMsg.textContent = "Invalid phone number. Please try again";
      } else if (password.length < 6 || retypePassword.length < 6) {
        errorMsg.textContent = "Password is short";
      } else if (password !== retypePassword) {
        errorMsg.textContent = "Password not match. Please try again";
        field[4].setAttribute("data-error", "Password not match");
      } else {
        const user = {
          name,
          phoneNumber,
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

  return (
    <div className="signup-form form">
      <div className="input-field" id="signup-name">
        <i className="fa-solid fa-user"></i>
        <input
          id="signup-name-ip"
          placeholder="Name"
          onChange={() => {
            handleInputChange("signup-name");
          }}
          onBlur={() => handleCheckInput("signup-name", "signup-name-ip")}
        />
      </div>
      <div className="input-field" id="signup-phone">
        <i className="fa-solid fa-phone"></i>
        <input
          id="signup-phone-ip"
          placeholder="Phone number"
          onChange={() => {
            handleInputChange("signup-phone");
          }}
          onBlur={() => handleCheckInput("signup-phone", "signup-phone-ip")}
        />
      </div>
      <div className="input-field" id="signup-email">
        <i className="fa-solid fa-envelope"></i>
        <input
          id="signup-email-ip"
          placeholder="Email"
          type="email"
          onChange={() => handleInputChange("signup-email")}
          onBlur={() => handleCheckInput("signup-email", "signup-email-ip")}
        />
      </div>
      <div className="input-field" id="signup-password">
        <i className="fa-solid fa-lock"></i>
        <input
          id="signup-password-ip"
          placeholder="Password"
          type={isShowPassword}
          onChange={() => handleInputChange("signup-password")}
          onBlur={() =>
            handleCheckInput("signup-password", "signup-password-ip")
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
      <div className="input-field" id="signup-retype">
        <i className="fa-solid fa-lock"></i>
        <input
          id="signup-retype-ip"
          placeholder="Retype password"
          type={isShowPassword}
          onChange={() => handleInputChange("signup-retype")}
          onBlur={() => handleCheckInput("signup-retype", "signup-retype-ip")}
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

export default SignupForm;
