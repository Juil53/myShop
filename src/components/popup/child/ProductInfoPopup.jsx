import Slider from "react-slick";
import { useState } from "react";
import { useSelector } from "react-redux";

import { utils } from "../../../utils";
import { pageSelector } from "../../../store/page/selector";

export default function ProductInfoPopup(props) {
  const { closePopup } = props;
  const [mainSlider, setMainSlider] = useState();
  const [subSlider, setSubSlider] = useState();

  const [number, setNumber] = useState(1);
  const { popup } = useSelector(pageSelector);
  const productInfo = popup.additionalInfo;

  console.log(productInfo.img);
  const settings_mainSlider = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  };
  const settings_subSlider = {
    slidesToShow: productInfo.img
      ? productInfo.img.length > 2
        ? 3
        : productInfo.img.length
      : 1,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
  };

  function handleDecrease() {
    if (number - 1 > 0) {
      return setNumber(number - 1);
    }
  }

  function handleIncrease() {
    if (number + 1 <= productInfo.quantity) {
      return setNumber(number + 1);
    }
  }

  function handleChangeInput(e) {
    let tmp = parseInt(e.target.value);
    if (tmp !== number && tmp <= productInfo.quantity) {
      return setNumber(tmp);
    } else if (tmp > productInfo.quantity) {
      return setNumber(productInfo.quantity);
    }
  }

  function createSubSlider(data) {
    return (
      <Slider
        {...settings_subSlider}
        asNavFor={mainSlider}
        ref={(slider2) => setSubSlider(slider2)}
      >
        {data.map((v) => (
          <div className="subimg" key={v}>
            <div className="img-container">
              <img src={v} alt="" />
            </div>
          </div>
        ))}
      </Slider>
    );
  }

  function createMainSlider(data) {
    return (
      <Slider
        {...settings_mainSlider}
        asNavFor={subSlider}
        ref={(slider1) => setMainSlider(slider1)}
      >
        {data.map((v) => (
          <div className="img-container" key={v}>
            <img src={v} alt="" />
          </div>
        ))}
      </Slider>
    );
  }

  return (
    <div className="modal center">
      {!productInfo.img ? (
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
          <div className="productinfopopup__left">
            <div className="main-img">{createMainSlider(productInfo.img)}</div>
            <div
              className={
                productInfo.img.length > 1
                  ? "subimg-container"
                  : "subimg-container special"
              }
            >
              {createSubSlider(productInfo.img)}
            </div>
          </div>
          <div className="productinfopopup__info">
            <div className="productinfopopup__info-name font-bold">
              {productInfo.name}
            </div>
            <div className="productinfopopup__info-vend row">
              <div className="left">
                Brand:
                <span>{productInfo.brand}</span>
              </div>
              <div className="right">
                Status:
                <span>{productInfo.status}</span>
              </div>
            </div>
            <div className="productinfopopup__info-price text-brand font-bold">
              {utils.priceBreak(productInfo.price_after_discount)}₫
              {productInfo.price_after_discount !==
                productInfo.price_before_discount && (
                <span className="price-compare">
                  {utils.priceBreak(productInfo.price_before_discount)}₫
                </span>
              )}
            </div>
            <div className="productinfopopup__info-attributes">
              {productInfo.attributes.map((v) => (
                <div key={v.name + "att"}>
                  - {v.name}: <span>{v.value}</span>
                </div>
              ))}
            </div>
            <div className="productinfopopup__info-color"></div>
            <div className="productinfopopup__info-quantity row">
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
                disabled={number + 1 > productInfo.quantity}
              >
                +
              </button>
            </div>
            <button className="addcart-btn">Add cart</button>
          </div>
          <div
            className="productinfopopup__cancel-btn round"
            onClick={closePopup}
          >
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
      )}
    </div>
  );
}
