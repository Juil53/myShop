import { utils } from "../../../utils";
import { useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
export default function ProductInfoPopup(props) {
  let { closePopup } = props;
  const [mainSlider, setMainSlider] = useState();
  const [subSlider, setSubSlider] = useState();
  const settings_mainSlider = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  };
  const settings_subSlider = {
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
  };
  const [number, setNumber] = useState(1);
  const popup = useSelector((store) => store.app.popup);
  const productInfo = popup.additionalInfo;
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

  return (
    <div className="modal center">
      <div className="productinfopopup row">
        <div className="productinfopopup__left">
          <div className="main-img">
            <Slider
              {...settings_mainSlider}
              asNavFor={subSlider}
              ref={(slider1) => setMainSlider(slider1)}
            >
              <div className="img-container">
                <img src={productInfo.img} alt="" />
              </div>
              <div className="img-container">
                <img src="./img/sp1sub.png" alt="" />
              </div>
              <div className="img-container">
                <img src={productInfo.img} alt="" />
              </div>
            </Slider>
          </div>
          <div className="subimg-container">
            <Slider
              {...settings_subSlider}
              asNavFor={mainSlider}
              ref={(slider2) => setSubSlider(slider2)}
            >
              <div className="subimg">
                <div className="img-container">
                  <img src={productInfo.img} alt="" />
                </div>
              </div>
              <div className="subimg">
                <div className="img-container">
                  <img src="./img/sp1sub.png" alt="" />
                </div>
              </div>
              <div className="subimg">
                <div className="img-container">
                  <img src={productInfo.img} alt="" />
                </div>
              </div>
            </Slider>
          </div>
        </div>
        <div className="productinfopopup__info">
          <div className="productinfopopup__info-name font-bold">
            {productInfo.name}
          </div>
          <div className="productinfopopup__info-vend row">
            <div className="left">
              Thương hiệu:
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
            <input type="number" value={number} onChange={handleChangeInput} />
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
    </div>
  );
}
