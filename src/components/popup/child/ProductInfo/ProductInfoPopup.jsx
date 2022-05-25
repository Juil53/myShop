import { useState } from "react";
import { useDispatch } from "react-redux";

import { utils } from "../../../../utils";
import { POPUP } from "../../../../constants";
import { actions } from "../../../../store/page/slice";
import LeftImageSlider from "./child/LeftImageSlider";
import Quantity from "../../../quantity/Quantity";

export default function ProductInfoPopup(props) {
  const { closePopup, data } = props;
  const dispatch = useDispatch();

  function handleAddCart() {
    dispatch(
      actions.activePopup({
        type: POPUP.ADD_CART_POPUP,
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
              <Quantity value="1" quantity={data.quantity} />
              <div className="number-product">325 products avaiable</div>
            </div>
            <button
              onClick={handleAddCart}
              className="addcart-btn button-style"
            >
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
