import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { LOADING_STATUS, POPUP, USER_ACTIONS } from "../../../../constants";
import { clientSelector } from "../../../../store/clients/selector";
import { actions } from "../../../../store/page/slice";
import { checkName, checkPhoneFormat } from "../../../../validation/validate";

import InputField from "../../../input_field/InputField";
import { getRegions, getDistricts, getWards } from "./api";
import { randomIntFromInterval } from "../../../../utils";

const AddressPopup = (props) => {
  const { closePopup, data, currentAddress } = props;
  //console.log(currentAddress);

  const navigate = useNavigate();
  const [click, setClick] = useState(false);

  const dispatch = useDispatch();
  const client = useSelector(clientSelector);

  const [isDefault, setDefault] = useState(false);

  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [address, setAddress] = useState({});

  const [disableDistrict, setDisableDistrict] = useState(true);
  const [disableWard, setDisableWard] = useState(true);

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [add, setAdd] = useState("");

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
    if (client.updateStatus === LOADING_STATUS.LOADING && click) {
      dispatch(actions.activePopup({ type: POPUP.WAITING_POPUP }));
    } else if (client.updateStatus === LOADING_STATUS.SUCCESS && click) {
      dispatch(actions.hidePopup(POPUP.WAITING_POPUP));
      navigate(`/user/address`);
      closePopup();
    } else if (client.updateStatus === LOADING_STATUS.FAIL && click) {
      dispatch(actions.hidePopup(POPUP.WAITING_POPUP));
    }
  });

  const handleAddNewAddress = () => {
    if (
      name &&
      add &&
      phoneNumber &&
      checkPhoneFormat(phoneNumber) &&
      checkName(name) === "valid"
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
        //console.log();
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
            console.log("hihi");
            addID = data.id + randomIntFromInterval(1, 10000);
          }
          newAddress.id = addID;
        }
        newData.addressList.push(newAddress);

        dispatch({
          type: USER_ACTIONS.UPDATE_USER_INFO,
          data: newData,
          uid: data.id,
        });
      }
    }

    setClick(true);
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
          />
          <InputField
            title="Phone number"
            id="add_new_address-phone_number"
            onChange={setPhoneNumber}
            required
            type="phoneNumber"
          />
          <InputField
            title="Address"
            id="add_new_address-address"
            onChange={setAdd}
            required
          />
          <div className="address_field row">
            <select onChange={onChangeRegion} name="Province" id="province">
              <option value="" hidden>
                Select province
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
                Select District
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
                Select ward
              </option>
              {wards.map((w, i) => (
                <option key={w.id} value={i}>
                  {w.name}
                </option>
              ))}
            </select>
          </div>
          <div className="is_default">
            <input
              type="checkbox"
              id="is-default"
              checked={isDefault}
              onChange={handleSetDefault}
            />
            <label htmlFor="is-default">Set as default address</label>
          </div>
          <div className="address_error-msg" id="address_error-msg"></div>
          <div className="function row">
            <button className="back-btn" onClick={closePopup}>
              Cancel
            </button>
            <button
              className="button-style add-btn"
              onClick={handleAddNewAddress}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressPopup;
