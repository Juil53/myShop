import { utils } from "../../../utils";

const Payment = () => {
  return (
    <div className="payment-page">
      <div className="title">Payment</div>
      <div className="payment-container row">
        <div className="delivery-info">
          <div className="name">Delivery Information</div>
          <div className="detail-info">
            <input
              id="email"
              className="field-input"
              placeholder=" "
              autoComplete="off"
            />
            <label htmlFor="email" className="field-name">
              Email
            </label>
          </div>
          <div className="detail-info">
            <input
              id="name"
              className="field-input"
              placeholder=" "
              autoComplete="off"
            />
            <label htmlFor="name" className="field-name">
              Name
            </label>
          </div>
          <div className="detail-info">
            <input
              id="phone"
              className="field-input"
              placeholder=" "
              autoComplete="off"
            />
            <label htmlFor="phone" className="field-name">
              Phone number
            </label>
          </div>
          <div className="detail-info">
            <input
              id="address"
              className="field-input"
              placeholder=" "
              autoComplete="off"
            />
            <label htmlFor="address" className="field-name">
              Address
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
