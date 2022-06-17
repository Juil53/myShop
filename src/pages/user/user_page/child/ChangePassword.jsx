import { useState } from "react";

const ChangePassword = () => {
  const [isShowPassword, setIsShowPassword] = useState([
    "password",
    "password",
    "password",
  ]);

  const handleShowPassword = (i) => {
    const tmp = [...isShowPassword];

    if (tmp[i] === "password") {
      tmp[i] = "text";
    } else {
      tmp[i] = "password";
    }

    return setIsShowPassword(tmp);
  };

  return (
    <div className="change-password">
      <div className="title">Change password</div>
      <div className="form">
        <div className="input-field">
          <i className="fa-solid fa-lock"></i>
          <input placeholder="Current password" type={isShowPassword[0]} />
          <i
            className={
              isShowPassword[0] === "text"
                ? "fa-solid fa-eye showpass"
                : "fa-solid fa-eye-slash showpass"
            }
            onClick={() => handleShowPassword(0)}
          />
        </div>
        <div className="input-field">
          <i className="fa-solid fa-lock"></i>
          <input placeholder="New password" type={isShowPassword[1]} />
          <i
            className={
              isShowPassword[1] === "text"
                ? "fa-solid fa-eye showpass"
                : "fa-solid fa-eye-slash showpass"
            }
            onClick={() => handleShowPassword(1)}
          />
        </div>
        <div className="input-field">
          <i className="fa-solid fa-lock"></i>
          <input placeholder="Retype new password" type={isShowPassword[2]} />
          <i
            className={
              isShowPassword[2] === "text"
                ? "fa-solid fa-eye showpass"
                : "fa-solid fa-eye-slash showpass"
            }
            onClick={() => handleShowPassword(2)}
          />
        </div>
        <button className="change-password-btn button-style">Save</button>
      </div>
    </div>
  );
};

export default ChangePassword;
