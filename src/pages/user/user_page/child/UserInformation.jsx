import { useState } from "react";
import { checkPhoneFormat } from "../../../../utils";

const UserInformation = (props) => {
  const { data } = props;
  console.log(data);

  const [value, setValue] = useState({
    displayName: data.displayName,
    phoneNumber: data.phoneNumber || "",
  });

  const setError = (field, msg) => {
    document.getElementById(field).setAttribute("data-error", msg);
  };

  const clearError = (field) => {
    document.getElementById(field).removeAttribute("data-error");
  };

  const handleInputChange = (e) => {
    const newValue = { ...value };
    clearError(`field_${e.target.id}`);
    newValue[e.target.id] = e.target.value;
    setValue(newValue);
  };

  const checkInput = (e) => {
    const newValue = { ...value };
    if (!value[e.target.id]) {
      newValue[e.target.id] = data[e.target.id];
      return setValue(newValue);
    } else if (
      e.target.id === "phoneNumber" &&
      !checkPhoneFormat(value.phoneNumber)
    ) {
      setError(
        `field_${e.target.id}`,
        "Invalid phone number. Enter a right one"
      );
    }
  };

  return (
    <div className="user_infor-container">
      <div className="title">Your information</div>
      <div className="user_infor">
        <div className="user_pic">
          <img src={data.image} alt="" />
          <button className="change_pic-btn">
            <i className="fa-solid fa-pen"></i>
          </button>
        </div>
        <div className="user_infor-field" id="field_displayName">
          <label htmlFor="displayName">Name</label>
          <input
            type="text"
            placeholder="Name"
            value={value.displayName}
            id="displayName"
            onChange={handleInputChange}
            onBlur={checkInput}
          />
        </div>
        <div className="user_infor-field" id="field_phoneNumber">
          <label htmlFor="phoneNumber">Phone number</label>
          <input
            type="text"
            placeholder="Phone number"
            value={value.phoneNumber}
            id="phoneNumber"
            onChange={handleInputChange}
            onBlur={checkInput}
          />
        </div>
      </div>
      <div className="save_change-container">
        <button className="button-style save_change">Save change</button>
      </div>
    </div>
  );
};

export default UserInformation;
