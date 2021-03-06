import { useState } from "react";
import { constant } from "../../constants";

import {
  checkEmailFormat,
  checkMinLength,
  checkName,
  checkPassword,
  checkPhoneFormat,
} from "../../validation/validateInputField";

const InputField = ({
  id,
  title,
  currentValue,
  onChange,
  required,
  type,
  min,
  needCheck,
}) => {
  const [isShowPassword, setIsShowPassword] = useState("password");
  const [value, setValue] = useState(currentValue || "");

  const handleShowPassword = () => {
    if (isShowPassword === "password") {
      return setIsShowPassword("text");
    } else {
      return setIsShowPassword("password");
    }
  };

  const handleChangeValue = (e) => {
    removeError(id);
    setValue(e.target.value);
    return onChange(e.target.value);
  };

  const setError = (id, msg) => {
    document.getElementById(id).setAttribute("data-error", msg);
  };

  const removeError = (id) => {
    document.getElementById(id).removeAttribute("data-error");
  };

  const checkValue = (e) => {
    let val = e.target.value;
    if (required && !val) {
      setError(id, "Required. Fill this field");
    } else if (min) {
      if (!checkMinLength(val, min)) {
        setError(id, `Too short. At least ${min} characters`);
      }
    } else {
      switch (type) {
        case "phoneNumber":
        case "phone": {
          const kq = checkPhoneFormat(val);

          if (!kq) {
            setError(id, "Invalid phone number. Enter right one.");
          }
          return;
        }

        case "name": {
          const kq = checkName(val);

          if (kq !== constant.validName) {
            setError(id, `Your name is very ${kq}. Try again`);
          }
          return;
        }

        case "email": {
          const kq = checkEmailFormat(val);

          if (!kq) {
            setError(id, "Invalid email. Enter right one.");
          }
          return;
        }

        case "password": {
          if (needCheck && !checkPassword(val)) {
            setError(
              id,
              "Password must have at least 8 characters, 1 lower case and 1 digit."
            );
          }
          return;
        }
      }
    }
  };

  return (
    <div className="input_field" id={id}>
      <input
        id={id + "-ip"}
        className="field-input"
        placeholder=" "
        onChange={handleChangeValue}
        onBlur={checkValue}
        value={value}
        type={type === "password" ? isShowPassword : "text"}
      />
      {type === "password" && (
        <i
          className={
            isShowPassword === "password"
              ? "fa-solid fa-eye-slash showpass"
              : "fa-solid fa-eye showpass"
          }
          onClick={handleShowPassword}
        />
      )}
      <label htmlFor={id + "-ip"} className="field-name">
        {title}
      </label>
    </div>
  );
};

export default InputField;
