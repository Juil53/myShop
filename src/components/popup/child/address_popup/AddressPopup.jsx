import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  constant,
  LOADING_STATUS,
  POPUP,
  USER_ACTIONS,
} from "../../../../constants";
import { clientSelector } from "../../../../store/clients/selector";
import { actions } from "../../../../store/page/slice";
import {
  checkName,
  checkPhoneFormat,
} from "../../../../validation/validateInputField";

import InputField from "../../../input_field/InputField";
import { getRegions, getDistricts, getWards } from "./api";
import { randomIntFromInterval } from "../../../../utils";
import localStorage from "../../../../service/localStorage";
import { clientActions } from "../../../../store/clients/slice";

const AddressPopup = (props) => {
  const {
    closePopup,
    data: { currentAddress, ...data },
  } = props;
  const token = localStorage.get("token");

  const navigate = useNavigate();
  const [click, setClick] = useState(false);

  const dispatch = useDispatch();
  const client = useSelector(clientSelector);

  const [isDefault, setDefault] = useState(currentAddress?.default || false);

  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [address, setAddress] = useState({});

  const [disableDistrict, setDisableDistrict] = useState(true);
  const [disableWard, setDisableWard] = useState(true);

  const [name, setName] = useState(currentAddress?.name || "");
  const [phoneNumber, setPhoneNumber] = useState(
    currentAddress?.phoneNumber || ""
  );
  const [add, setAdd] = useState(currentAddress?.address?.detail || "");

  const handleSetDefault = () => {
    if (isDefault) {
      return setDefault(false);
    } else {
      return setDefault(true);
    }
  };

  const onChangeRegion = ({ target }) => {
    setDisableDistrict(true);
    setDisableWard(true);

    const regionIndex = target.value;
    const region = regions[regionIndex];
    const newAddress = { ...address };

    newAddress.region = { ...region };
    newAddress.district = null;
    newAddress.ward = null;

    setAddress(newAddress);
    setDistricts([]);
    setWards([]);
  };

  const onChangeDistrict = async ({ target }) => {
    setDisableWard(true);

    const districtIndex = target.value;
    const district = districts[districtIndex];
    const newAddress = { ...address };

    newAddress.district = { ...district };
    newAddress.ward = null;

    setAddress(newAddress);
    setWards([]);
  };

  const onChangeWard = async ({ target }) => {
    const wardIndex = target.value;
    const ward = wards[wardIndex];
    const newAddress = { ...address };

    newAddress.ward = { ...ward };

    setAddress(newAddress);
  };

  useEffect(() => {
    (async () => {
      const regions = await getRegions();
      setRegions(regions);
    })(); // IIF
  }, []);

  useEffect(() => {
    (async () => {
      const regionId = address?.region?.id;

      if (regionId) {
        const districts = await getDistricts(regionId);
        setDistricts(districts);
        setDisableDistrict(false);
      }
    })();
  }, [address?.region?.id]);

  useEffect(() => {
    (async () => {
      const districtId = address?.district?.id;

      if (districtId) {
        const wards = await getWards(districtId);
        setWards(wards);
        setDisableWard(false);
      }
    })();
  }, [address?.district?.id]);

  useEffect(() => {
    if (currentAddress) {
      setAddress(currentAddress.address);
    }
  }, []);

  useEffect(() => {
    if (client.updateStatus === LOADING_STATUS.LOADING && click) {
      dispatch(actions.activePopup({ type: POPUP.WAITING_POPUP }));
    } else if (client.updateStatus === LOADING_STATUS.SUCCESS && click) {
      dispatch(actions.hidePopup(POPUP.WAITING_POPUP));
      navigate(`/user/address`);
      closePopup();
    } else if (client.updateStatus === LOADING_STATUS.FAIL && click) {
      dispatch(actions.hidePopup(POPUP.WAITING_POPUP));
    }
    if (!token) {
      closePopup();
    }
  });

  const handleAddNewAddress = () => {
    if (
      name &&
      add &&
      phoneNumber &&
      checkPhoneFormat(phoneNumber) &&
      checkName(name) === constant.validName
    ) {
      if (
        Object.keys(address).length < 3 ||
        !address.ward ||
        !address.district
      ) {
        document.getElementById("address_error-msg").textContent =
          "Please select address";
      } else {
        let addID = data.id + randomIntFromInterval(1, 10000);
        const newAddress = {
          id: addID,
          name: name,
          address: {
            ...address,
            detail: add,
          },
          phoneNumber: phoneNumber,
        };

        const newData = {};

        //set default address
        if (!data.addressList || isDefault) {
          newAddress.default = true;
          newData.addressList = [];

          for (let i = 0; i < data.addressList?.length; i++) {
            if (data.addressList[i].default) {
              const { default: d, ...others } = data.addressList[i];
              const newObj = { ...others };

              newData.addressList.push(newObj);
            } else {
              newData.addressList.push(data.addressList[i]);
            }
          }
        } else {
          newData.addressList = [...data.addressList];
        }

        //Check ID
        if (data.addressList) {
          while (data.addressList.filter((v) => v.id === addID)?.length !== 0) {
            addID = data.id + randomIntFromInterval(1, 10000);
          }
          newAddress.id = addID;
        }
        newData.addressList.push(newAddress);

        dispatch(clientActions.updateRequest({ data: newData, uid: data.id }));
      }
    }

    setClick(true);
  };

  const handleUpdateAddress = () => {
    const error = document.getElementById("address_error-msg");
    error.textContent = "";

    if (
      name &&
      add &&
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
        const newAddress = {
          ...currentAddress,
          name: name,
          address: {
            ...address,
            detail: add,
          },
          phoneNumber: phoneNumber,
        };

        const newData = {};

        const findAdd = data.addressList.filter(
          (v) => v.id === currentAddress.id
        );

        if (findAdd?.length !== 0) {
          if (isDefault) {
            newAddress.default = true;

            //clear default for others (only 1 default address)
            if (data.addressList.length > 1) {
              newData.addressList = [];

              for (let i = 0; i < data.addressList?.length; i++) {
                if (
                  data.addressList[i].default &&
                  data.addressList[i].id !== currentAddress.id
                ) {
                  const { default: d, ...others } = data.addressList[i];
                  const newObj = { ...others };

                  newData.addressList.push(newObj);
                } else {
                  newData.addressList.push(data.addressList[i]);
                }
              }
            } else {
              newData.addressList = [...data.addressList];
            }
          } else {
            newData.addressList = [...data.addressList];
          }

          const index = newData.addressList.indexOf(findAdd[0]);

          //update address
          newData.addressList[index] = { ...newAddress };

          //call update info saga
          dispatch(
            clientActions.updateRequest({ data: newData, uid: data.id })
          );
        } else {
          error.textContent =
            "Something went wrong. Please press cancel and try again";
        }
      }
      setClick(true);
    }
  };

  return (
    <div className="modal center">
      <div className="address_popup-container">
        <div className="title">Add new address</div>
        <div className="form">
          <InputField
            title="Name"
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
          <InputField
            title="Address"
            id="add_new_address-address"
            onChange={setAdd}
            required
            currentValue={add}
          />
          <div className="address_field row">
            <select onChange={onChangeRegion} name="Province" id="province">
              <option value="" hidden>
                {currentAddress
                  ? currentAddress?.address?.region?.name
                  : "Select province"}
              </option>
              {regions.map((r, i) => (
                <option key={r.id} value={i}>
                  {r.name}
                </option>
              ))}
            </select>
            <select
              onChange={onChangeDistrict}
              name="District"
              id="district"
              disabled={disableDistrict}
            >
              <option value="" hidden>
                {currentAddress &&
                currentAddress?.address?.district?.id === address?.district?.id
                  ? currentAddress?.address?.district?.name
                  : "Select district"}
              </option>
              {districts.map((d, i) => (
                <option key={d.id} value={i}>
                  {d.name}
                </option>
              ))}
            </select>
            <select
              name="Ward"
              id="ward"
              disabled={disableWard}
              onChange={onChangeWard}
            >
              <option value="" hidden>
                {currentAddress &&
                currentAddress?.address?.ward?.id === address?.ward?.id
                  ? currentAddress?.address?.ward?.name
                  : "Select ward"}
              </option>
              {wards.map((w, i) => (
                <option key={w.id} value={i}>
                  {w.name}
                </option>
              ))}
            </select>
          </div>
          {!currentAddress?.default && (
            <div className="is_default">
              <input
                type="checkbox"
                id="is-default"
                checked={isDefault}
                onChange={handleSetDefault}
              />
              <label htmlFor="is-default">Set as default address</label>
            </div>
          )}
          <div className="address_error-msg" id="address_error-msg"></div>
          <div className="function row">
            <button className="back-btn" onClick={closePopup}>
              Cancel
            </button>
            <button
              className="button-style add-btn"
              onClick={
                !currentAddress ? handleAddNewAddress : handleUpdateAddress
              }
            >
              {currentAddress ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressPopup;
