import Slider from "react-slick";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { utils } from "../../../../utils";
import { POPUP } from "../../../../constants";
import { actions } from "../../../../store/page/slice";

export default function ProductInfoPopup(props) {
  const { closePopup, data } = props;
  const dispatch = useDispatch();

  const [mainSlider, setMainSlider] = useState();
  const [subSlider, setSubSlider] = useState();
  const [number, setNumber] = useState(1);

  const settings_mainSlider = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  };

  const settings_subSlider = {
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
    centerMode: true,
  };

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

  function createSubSlider(data) {
    if (data.length <= 1) {
      return <></>;
    }
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

  function handleAddCart() {
    dispatch(
      actions.activePopup({
        type: POPUP.LOGIN_POPUP,
      })
    );
  }

  function createColor(data) {
    if (data.length <= 1) {
    }
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
          <div className="productinfopopup__left vertical">
            <div className="main-img">{createMainSlider(data.img)}</div>
            <div
              className={
                data.img.length > 1
                  ? "subimg-container"
                  : "subimg-container special"
              }
            >
              {createSubSlider(data.img)}
            </div>
          </div>
          <div className="productinfopopup__info">
            <div className="productinfopopup__info-name font-bold">
              {data.name}
            </div>
            <div className="productinfopopup__info-vend row">
              <div className="left">
                Brand:
                <span>{data.brand}</span>
              </div>
              <div className="right">
                Status:
                <span>{data.status}</span>
              </div>
            </div>
            <div className="productinfopopup__info-price text-brand font-bold">
              {utils.priceBreak(data.price_after_discount)}₫
              {data.price_after_discount !== data.price_before_discount && (
                <span className="price-compare">
                  {utils.priceBreak(data.price_before_discount)}₫
                </span>
              )}
            </div>
            <div className="productinfopopup__info-attributes">
              {data.attributes.map((v) => (
                <div key={v.name + "att"}>
                  - {v.name}: <span>{v.value}</span>
                </div>
              ))}
            </div>
            <div className="productinfopopup__info-color row">
              <div className="title">Color</div>
              <div className="color row">
                <div className="color-item color-item__click">Black</div>
                <div className="color-item">Green</div>
                <div className="color-item">Blue</div>
              </div>
            </div>
            <div className="productinfopopup__info-size row">
              <div className="title">Size</div>
              <div className="size row">
                <div className="size-item size-item__click">S</div>
                <div className="size-item">M</div>
                <div className="size-item">L</div>
              </div>
            </div>
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
              Add cart
            </button>
          </div>
          <div className="popup__cancel-btn round" onClick={closePopup}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
      )}
    </div>
  );
}
