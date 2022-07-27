import { useState, useEffect } from "react";

import { getRegions, getDistricts, getWards } from "./api";

const Address = (props) => {
  const { currentAddress, changeCurrentAddress } = props;

  const [address, setAddress] = useState({});
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  //reset when changing province
  const [disableDistrict, setDisableDistrict] = useState(true);
  const [disableWard, setDisableWard] = useState(true);

  //when changing province
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
    changeCurrentAddress(newAddress);
    setDistricts([]);
    setWards([]);
  };

  //when changing district
  const onChangeDistrict = async ({ target }) => {
    setDisableWard(true);

    const districtIndex = target.value;
    const district = districts[districtIndex];
    const newAddress = { ...address };

    newAddress.district = { ...district };
    newAddress.ward = null;

    setAddress(newAddress);
    changeCurrentAddress(newAddress);
    setWards([]);
  };

  //when changing ward
  const onChangeWard = async ({ target }) => {
    const wardIndex = target.value;
    const ward = wards[wardIndex];
    const newAddress = { ...address };

    newAddress.ward = { ...ward };

    setAddress(newAddress);
    changeCurrentAddress(newAddress);
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
      setAddress(currentAddress);
    }
  }, []);

  return (
    <div className="address_container">
      <select onChange={onChangeRegion} name="Province" id="province">
        <option value="" hidden>
          {currentAddress ? currentAddress?.region?.name : "Select province"}
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
          currentAddress?.district?.id === address?.district?.id
            ? currentAddress?.district?.name
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
          {currentAddress && currentAddress?.ward?.id === address?.ward?.id
            ? currentAddress?.ward?.name
            : "Select ward"}
        </option>
        {wards.map((w, i) => (
          <option key={w.id} value={i}>
            {w.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Address;
