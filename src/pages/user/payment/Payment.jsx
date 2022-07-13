import { useEffect, useState } from "react";

import Address from "../../../components/address/Address";
import InputField from "../../../components/input_field/InputField";
import { utils } from "../../../utils";

const Payment = () => {
  const [address, setAddress] = useState({});
  const [name, setName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [detail, setDetail] = useState();

  useEffect(() => {
    console.log(address);
  });

  return (
    <div className="payment_page">
      <div className="title">Payment</div>
      <div className="payment_container row">
        <div className="delivery_info">
          <div className="name">Delivery Information</div>
          <InputField
            title="Name"
            id="delivery_info-name"
            onChange={setName}
            required
            type="name"
            currentValue={name}
          />
          <InputField
            title="Phone number"
            id="delivery_info-phone_number"
            onChange={setPhoneNumber}
            required
            type="phone"
            currentValue={phoneNumber}
          />
          <InputField
            title="Address"
            id="delivery_info-address"
            onChange={setDetail}
            required
            currentValue={detail}
          />
          <Address changeCurrentAddress={setAddress} />
        </div>
      </div>
    </div>
  );
};

export default Payment;
