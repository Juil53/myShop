import { useState } from "react";
import { useDispatch } from "react-redux";

import { utils } from "../../../../utils";
import { POPUP } from "../../../../constants";
import { actions } from "../../../../store/page/slice";
import LeftImageSlider from "./child/LeftImageSlider";

export default function ProductInfoPopup(props) {
  const { closePopup, data } = props;
  const dispatch = useDispatch();

  const [number, setNumber] = useState(1);

  function handleDecrease() {
    if (number - 1 > 0) {
      return setNumber(number - 1);
    }
  }

  function handleIncrease() {
    if (number + 1 <= data.quantity) {
      return setNumber(number + 1);
    }
  }

  function handleChangeInput(e) {
    let tmp = parseInt(e.target.value);
    if (tmp !== number && tmp <= data.quantity) {
      return setNumber(tmp);
    } else if (tmp > data.quantity) {
      return setNumber(data.quantity);
    }
  }

  function handleAddCart() {
    dispatch(
      actions.activePopup({
        type: POPUP.LOGIN_POPUP,
      })
    );
  }

  function createColor(data) {
    if (data) {
      if (data.length > 0) {
        return data.map((v) => (
          <div className="configurable-options row" key={v.id}>
            <div className="title">{v.name}</div>
            {createOptionItem(v.values)}
          </div>
        ));
      }
    }
  }

  function createOptionItem(data) {
    if (data.length <= 3) {
      return (
        <div className="option row">
          {data.map((i) => (
            <div className="option-item" key={i + "configurableOptions"}>
              {i}
            </div>
          ))}
        </div>
      );
    }
    return (
      <div className="option option-more row">
        {data.map((i) => (
          <div className="option-item" key={i + "configurableOptions"}>
            {i}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="modal center">
      {!data.img ? (
        <div className="productinfopopup">
          Something went wrong. Please try again later
          <div
            className="productinfopopup__cancel-btn round"
            onClick={closePopup}
          >
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
      ) : (
        <div className="productinfopopup row">
          <LeftImageSlider data={data.img} />
          <div className="productinfopopup__info">
            <div className="productinfopopup__info-name font-bold">
              {data.name}
            </div>
            <div className="productinfopopup__info-vend row">
              <div className="left">
                Brand:
                <span>{data.brand ? data.brand : "Not yet been update"}</span>
              </div>
              <div className="right">
                Status:
                <span>{data.status ? data.status : "Not yet been update"}</span>
              </div>
            </div>
            <div className="productinfopopup__info-price text-brand font-bold">
              {utils.priceBreak(data.priceAfterDiscount)}₫
              {data.priceAfterDiscount !== data.priceBeforeDiscount && (
                <span className="price-compare">
                  {utils.priceBreak(data.priceBeforeDiscount)}₫
                </span>
              )}
            </div>
            <div className="productinfopopup__info-attributes">
              {data.attributes &&
                data.attributes.map((v) => (
                  <div key={v.name + "att"}>
                    - {v.name}: <span>{v.value}</span>
                  </div>
                ))}
            </div>
            {createColor(data.configurableOptions)}
            <div className="productinfopopup__info-quantity row">
              <div className="title">Quantity</div>
              <div className="quantity row">
                <button
                  id="descrease-btn"
                  onClick={handleDecrease}
                  disabled={number - 1 < 1}
                >
                  -
                </button>
                <input
                  type="number"
                  value={number}
                  onChange={handleChangeInput}
                />
                <button
                  id="increase-btn"
                  onClick={handleIncrease}
                  disabled={number + 1 > data.quantity}
                >
                  +
                </button>
              </div>
              <div className="number-product">325 products avaiable</div>
            </div>
            <button onClick={handleAddCart} className="addcart-btn">
              Add to cart
            </button>
            <div style={{ height: "1.5rem" }}></div>
          </div>
          <div className="popup__cancel-btn round" onClick={closePopup}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
      )}
    </div>
  );
}
