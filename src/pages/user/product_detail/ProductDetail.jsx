import React from "react";
import { useState } from "react";
import Slider from "react-slick";

const ProductDetail = (props) => {
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
    arrows: false,
  };

  return (
    <React.Fragment>
      <div className="product-detail row">
        <div className="product-detail__img">
          <div className="main-img">
            <Slider
              {...settings_mainSlider}
              asNavFor={subSlider}
              ref={(slider1) => setMainSlider(slider1)}
            >
              <div className="img-container">
                <img src="/img/sp1sub.png" alt="" />
              </div>
              <div className="img-container">
                <img src="/img/sp1.png" alt="" />
              </div>
              <div className="img-container">
                <img src="/img/sp1.png" alt="" />
              </div>
            </Slider>
          </div>
          <div className="sub-img">
            <Slider
              {...settings_subSlider}
              asNavFor={mainSlider}
              ref={(slider2) => setSubSlider(slider2)}
            >
              <div className="subimg">
                <div className="img-container">
                  <img src="/img/sp1sub.png" alt="" />
                </div>
              </div>
              <div className="subimg">
                <div className="img-container">
                  <img src="/img/sp1.png" alt="" />
                </div>
              </div>
              <div className="subimg">
                <div className="img-container">
                  <img src="/img/sp1.png" alt="" />
                </div>
              </div>
            </Slider>
          </div>
        </div>
        <div className="product-detail__info">
          <div className="name">
            Giày tây nâu đỏ thương hiệu Converse All Star
          </div>
          <div className="status row">
            <div className="left">
              <span>Brand:</span>Converse
            </div>
            <div className="right">
              <span>Status:</span>Avaiable
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductDetail;
