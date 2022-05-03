import { utils } from "../../../utils";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function ProductInfoPopup(props) {
  let { closePopup } = props;
  const [number, setNumber] = useState(1);
  const popup = useSelector((store) => store.app.popup);
  function handleDecrease() {
    if (number - 1 > 0) {
      return setNumber(number - 1);
    }
  }
  console.log(popup.additionalInfo.attributes);
  function handleIncrease() {
    if (number + 1 <= popup.additionalInfo.quantity) {
      return setNumber(number + 1);
    }
  }
  function handleChangeInput(e) {
    let tmp = parseInt(e.target.value);
    if (tmp !== number && tmp <= popup.additionalInfo.quantity) {
      return setNumber(tmp);
    } else if (tmp > popup.additionalInfo.quantity) {
      return setNumber(popup.additionalInfo.quantity);
    }
  }
  return (
    <div className="modal center">
      <div className="productinfopopup row">
        <div className="productinfopopup__img">
          <div className="img-container">
            <img src={popup.additionalInfo.img} alt="" />
          </div>
        </div>
        <div className="productinfopopup__info">
          <div className="productinfopopup__info-name font-bold">
            {popup.additionalInfo.name}
          </div>
          <div className="productinfopopup__info-vend row">
            <div className="left">
              Thương hiệu:
              <span>Giày da cao cấp</span>
            </div>
            <div className="right">
              Tình trạng:
              <span>Còn hàng</span>
            </div>
          </div>
          <div className="productinfopopup__info-price text-brand font-bold">
            {utils.priceBreak(popup.additionalInfo.price_after_discount)}₫
            {popup.additionalInfo.price_after_discount !==
              popup.additionalInfo.price_before_discount && (
              <span className="price-compare">
                {utils.priceBreak(popup.additionalInfo.price_after_discount)}₫
              </span>
            )}
          </div>
          <div className="productinfopopup__info-attributes">
            {popup.additionalInfo.attributes.map((v) => (
              <div>
                - {v.name}: <span>{v.value}</span>
              </div>
            ))}
          </div>
          <div className="productinfopopup__info-color"></div>
          <div className="productinfopopup__info-quantity row">
            <button onClick={handleDecrease}>-</button>
            <input type="number" value={number} onChange={handleChangeInput} />
            <button onClick={handleIncrease}>+</button>
          </div>
          <button className="addcart-btn">Add cart</button>
        </div>
        <div
          className="productinfopopup__cancel-btn round"
          onClick={closePopup}
        >
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
    </div>
  );
}
