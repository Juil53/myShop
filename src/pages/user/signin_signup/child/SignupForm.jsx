import { useState } from "react";
import { checkEmailFormat, checkPhoneFormat } from "../../../../utils";

const SignupForm = () => {
  const [isShowPassword, setIsShowPassword] = useState("password");

  function handleShowPassword() {
    if (isShowPassword === "password") {
      return setIsShowPassword("text");
    } else {
      return setIsShowPassword("password");
    }
  }

  const setEmptyError = (f) => {
    f.setAttribute("data-error", "Fill this field");
  };

  function handleInputChange(f) {
    const field = document.getElementById(f);
    //clear error notify
    field.removeAttribute("data-error");
  }

  function handleCheckInput(inputField, thisInput) {
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
        field.setAttribute("data-error", "Wrong phone number format");
      }
    }
  }

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
      <span className="error-msg">Please enter all information</span>
      <button className="button-style signup-btn">Sign up</button>
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
