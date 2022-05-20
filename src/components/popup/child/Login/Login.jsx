import { useState } from "react";

const Login = (props) => {
  const { closePopup } = props;
  const [isPassword, setIsPassword] = useState("password");

  const showPassword = () => {
    if (isPassword === "password") {
      return setIsPassword("text");
    } else {
      return setIsPassword("password");
    }
  };

  return (
    <div className="modal center">
      <div className="login-popup">
        <div className="login-form">
          <h2>Login</h2>
          <div className="input-field">
            <i className="fa-solid fa-user"></i>
            <input placeholder="Username or phone"></input>
          </div>
          <div className="input-field">
            <i className="fa-solid fa-lock"></i>
            <input type={isPassword} placeholder="Password"></input>
            {isPassword === "password" ? (
              <i className="fa-solid fa-eye-slash" onClick={showPassword}></i>
            ) : (
              <i className="fa-solid fa-eye" onClick={showPassword}></i>
            )}
          </div>
          <button className="popup-login__btn">Login</button>
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
        <div className="popup__cancel-btn round" onClick={closePopup}>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
    </div>
  );
};

export default Login;
