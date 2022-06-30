import { checkName, checkPhoneFormat } from "../../validation/validate";

const InputField = (props) => {
  const { id, title, value, onChange, required, type } = props;

  const handleChangeValue = (e) => {
    removeError(id);
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
    } else {
      switch (type) {
        case "phoneNumber": {
          const kq = checkPhoneFormat(val);

          if (!kq) {
            setError(id, "Invalid phone number. Enter right one.");
          }
          return;
        }

        case "name": {
          const kq = checkName(val);

          if (kq !== "valid") {
            setError(id, `Your name is very ${kq}. Try again`);
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
        autoComplete="off"
        onChange={handleChangeValue}
        onBlur={checkValue}
      />
      <label htmlFor={id + "-ip"} className="field-name">
        {title}
      </label>
    </div>
  );
};

export default InputField;
