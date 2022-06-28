import { useEffect, useState } from "react";

import InputField from "../../../input_field/InputField";
import { getRegions, getDistricts, getWards } from "./api";

const AddressPopup = (props) => {
  const { closePopup } = props;

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

  return (
    <div className="modal center">
      <div className="address_popup-container">
        <div className="title">Add new address</div>
        <div className="form">
          <InputField
            title="Name"
            id="add_new_address-name"
            onChange={setName}
          />
          <InputField
            title="Phone number"
            id="add_new_address-phone_number"
            onChange={setPhoneNumber}
          />
          <InputField
            title="Address"
            id="add_new_address-address"
            onChange={setAdd}
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
            <select name="Ward" id="ward" disabled={disableWard}>
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
          <div className="function row">
            <button className="back-btn" onClick={closePopup}>
              Cancel
            </button>
            <button className="button-style add-btn">Add</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressPopup;
