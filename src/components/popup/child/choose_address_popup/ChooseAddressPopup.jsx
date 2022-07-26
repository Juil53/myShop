import { useEffect, useState } from "react";

import Address from "../../../address/Address";
import InputField from "../../../input_field/InputField";
import localStorage from "../../../../service/localStorage";
import { setOrderAddress } from "../../../../store/orders/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { constant, LOADING_STATUS, USER_ACTIONS } from "../../../../constants";
import {
  checkName,
  checkPhoneFormat,
} from "../../../../validation/validateInputField";
import { clientData } from "../../../../store/clients/selector";

const ChooseAddressPopup = ({ closePopup, data }) => {
  const { currentAddress } = data;
  const [address, setAddress] = useState(currentAddress);

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [detail, setDetail] = useState();

  const token = localStorage.get("token");
  const client = useSelector(clientData);

  const [isShowAdd, setIsShowAdd] = useState(token ? false : true);

  useEffect(() => {
    if (token && client.status === LOADING_STATUS.IDLE) {
      dispatch({ type: USER_ACTIONS.GET_USER_INFO });
    }
  }, []);

  const handleShowAdd = () => {
    if (isShowAdd) {
      return setIsShowAdd(false);
    } else {
      return setIsShowAdd(true);
    }
  };

  const handleAddAddress = () => {
    const error = document.querySelector(".choose-address__error");
    error.textContent = "";
    if (
      name &&
      detail &&
      phoneNumber &&
      checkPhoneFormat(phoneNumber) &&
      checkName(name) === constant.validName
    ) {
      if (
        Object.keys(address).length < 3 ||
        !address.ward ||
        !address.district
      ) {
        error.textContent = "Please select address";
      } else {
        const newOrderAddress = {
          address: { ...address, detail: detail },
          name: name,
          phoneNumber: phoneNumber,
        };

        dispatch(setOrderAddress(newOrderAddress));
        closePopup();
      }
    } else {
      error.textContent = "Complete all information required";
    }
  };

  const renderAddressOption = (data) => {
    if (data && data.length > 0) {
      return data.map((v) => (
        <option key={v.id} value={v.id}>
          {v.address.detail +
            ", " +
            v.address.ward.name +
            ", " +
            v.address.district.name +
            ", " +
            v.address.region.name}
        </option>
      ));
    }
  };

  const handleChangeAddressOption = ({ target }) => {
    const {
      info: { addressList },
    } = client;

    const choseAddress = addressList.find((v) => v.id === target.value);
    setAddress(choseAddress);
  };

  const handleConfirm = () => {
    if (address) {
      dispatch(setOrderAddress(address));
      closePopup();
    }
  };

  const renderAddOneAddress = () => {
    return (
      <div className="choose-address__section">
        <div className="row info">
          <InputField
            title="Full name"
            id="add_new_address-name"
            onChange={setName}
            required
            type="name"
            currentValue={name}
          />
          <InputField
            title="Phone number"
            id="add_new_address-phone_number"
            onChange={setPhoneNumber}
            required
            type="phoneNumber"
            currentValue={phoneNumber}
          />
        </div>
        <InputField
          title="Address"
          id="add_new_address-address"
          onChange={setDetail}
          required
          currentValue={detail}
        />
        <Address changeCurrentAddress={setAddress} />
        <div className="choose-address__error"></div>
        <div className="choose-address__function">
          <button className="cancel-btn" onClick={closePopup}>
            Cancel
          </button>
          <button className="button-style" onClick={handleAddAddress}>
            Add
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="modal center">
      <div className="choose-address">
        <div className="choose-address__header">Choose address</div>
        {token && (
          <div className="choose-address__section choose">
            <div className="choose-address__title">Choose one</div>
            {client.info.addressList && client.info.addressList.length > 0 ? (
              <div className="row">
                <select
                  name="Address"
                  id="address"
                  onChange={handleChangeAddressOption}
                  value={address.id}
                >
                  {renderAddressOption(client.info.addressList)}
                </select>
                <button
                  className="button-style confirm-btn"
                  onClick={handleConfirm}
                >
                  Confirm
                </button>
              </div>
            ) : (
              <div className="no-address">You don't have any address</div>
            )}
          </div>
        )}
        {token ? (
          <div className="choose-address__section">
            <div className="choose-address__title content row">
              Do you want to use other address?
              <button className="" onClick={handleShowAdd}>
                Click here
              </button>
            </div>
            {isShowAdd && renderAddOneAddress()}
          </div>
        ) : (
          <>
            <div className="choose-address__title">Add one</div>
            {renderAddOneAddress()}
          </>
        )}
      </div>
    </div>
  );
};

export default ChooseAddressPopup;
