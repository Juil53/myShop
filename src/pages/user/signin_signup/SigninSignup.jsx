import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_ACTIONS } from "../../../constants";
import { getUser } from "../../../store/user/selectors";

const SigninSignup = () => {
  const [isLoginPassword, setLoginPassword] = useState("password");
  const [isRegisPassword, setRegisPassword] = useState("password");
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const showPassword = (button) => {
    switch (button) {
      case "login": {
        if (isLoginPassword === "password") {
          return setLoginPassword("text");
        } else {
          return setLoginPassword("password");
        }
      }

      case "register": {
        if (isRegisPassword === "password") {
          return setRegisPassword("text");
        } else {
          return setRegisPassword("password");
        }
      }

      default: {
        return;
      }
    }
  };

  const activeSignin = () => {
    const signin_popup = document.querySelector(".signin-signup__container");

    signin_popup.classList.remove("signup-mode");
    signin_popup.classList.add("signin-mode");
  };

  const activeSignup = () => {
    const signin_popup = document.querySelector(".signin-signup__container");

    signin_popup.classList.remove("signin-mode");
    signin_popup.classList.add("signup-mode");
  };

  function handleInputChange(fieldId, errorField) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorField);
    error.style.display = "none";
    field.classList.remove("risk");
  }

  function login() {
    const emailField = document.getElementById("emailLoginField");
    const passwordField = document.getElementById("passwordLoginField");
    const errorField = document.getElementById("errorLogin");
    const email = document.getElementById("emailLogin").value;
    const password = document.getElementById("passwordLogin").value;

    if (!email) {
      emailField.classList.add("risk");
      errorField.style.display = "block";
    }

    if (!password) {
      passwordField.classList.add("risk");
      errorField.style.display = "block";
    } else if (password.length < 6) {
      passwordField.classList.add("risk");
      errorField.textContent = "Password should have more than 6 letters";
      errorField.style.display = "block";
    }

    if (email && password.length >= 6) {
      dispatch({
        type: USER_ACTIONS.FIND_USER,
        email: email,
        password: password,
      });
    }
  }

  return (
    <div className="signin-signup-page">
      <ul className="breadcums row">
        <li>
          <a>Home</a>
          <span>/</span>
        </li>
        <li>Login</li>
      </ul>
      <div className="signin-signup__container">
        <div className="signin-signup">
          <div className="form signin-form">
            <h2>Sign in</h2>
            <div className="input-field" id="emailLoginField">
              <i className="fa-solid fa-user"></i>
              <input
                placeholder="Email"
                id="emailLogin"
                onChange={() => {
                  handleInputChange("emailLoginField", "errorLogin");
                }}
              />
            </div>
            <div className="input-field" id="passwordLoginField">
              <i className="fa-solid fa-lock"></i>
              <input
                type={isLoginPassword}
                placeholder="Password"
                id="passwordLogin"
                onChange={() => {
                  handleInputChange("passwordLoginField", "errorLogin");
                }}
              />
              {isLoginPassword === "password" ? (
                <i
                  className="fa-solid fa-eye-slash"
                  onClick={() => {
                    showPassword("login");
                  }}
                ></i>
              ) : (
                <i
                  className="fa-solid fa-eye"
                  onClick={() => {
                    showPassword("login");
                  }}
                ></i>
              )}
            </div>
            <span className="error" id="errorLogin">
              Please enter all information
            </span>
            <button className="popup-signin__btn button-style" onClick={login}>
              Sign in
            </button>
            <div className="social-text">Or sign in with</div>
            <div className="social-media row">
              <a href="#">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-google"></i>
              </a>
            </div>
          </div>
          <div className="form signup-form">
            <h2>Sign up</h2>
            <div className="input-field">
              <i className="fa-solid fa-user"></i>
              <input placeholder="Phone number"></input>
            </div>
            <div className="input-field">
              <i className="fa-solid fa-lock"></i>
              <input type={isRegisPassword} placeholder="Password"></input>
              {isRegisPassword === "password" ? (
                <i
                  className="fa-solid fa-eye-slash"
                  onClick={() => {
                    showPassword("register");
                  }}
                ></i>
              ) : (
                <i
                  className="fa-solid fa-eye"
                  onClick={() => {
                    showPassword("register");
                  }}
                ></i>
              )}
            </div>
            <div className="input-field">
              <i className="fa-solid fa-lock"></i>
              <input
                type={isRegisPassword}
                placeholder="Retype password"
              ></input>
              {isRegisPassword === "password" ? (
                <i
                  className="fa-solid fa-eye-slash"
                  onClick={() => {
                    showPassword("register");
                  }}
                ></i>
              ) : (
                <i
                  className="fa-solid fa-eye"
                  onClick={() => {
                    showPassword("register");
                  }}
                ></i>
              )}
            </div>
            <button className="popup-signin__btn button-style">Sign up</button>
            <div className="social-text">Or sign up with</div>
            <div className="social-media row">
              <a href="#">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-google"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="panel-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Member of us</h3>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. A
                corrupti eveniet eum nesciunt laboriosam maiores!
              </p>
              <button
                className="panel-signin__btn button-style"
                onClick={activeSignin}
              >
                Sign in here
              </button>
            </div>
            <img src="/img/login.png" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>New of us</h3>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. A
                corrupti eveniet eum nesciunt laboriosam maiores!
              </p>
              <button
                className="panel-signin__btn button-style"
                onClick={activeSignup}
              >
                Sign up here
              </button>
            </div>
            <img src="/img/regis.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninSignup;
