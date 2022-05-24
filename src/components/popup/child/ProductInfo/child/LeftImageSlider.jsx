import Slider from "react-slick";
import { useState } from "react";

const LeftImageSlider = (props) => {
  const { data } = props;
  const [mainSlider, setMainSlider] = useState();
  const [subSlider, setSubSlider] = useState();

  const settings_mainSlider = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  };

  const settings_subSlider = {
    slidesToShow: 2,
    slidesToScroll: 1,
    focusOnSelect: true,
    centerMode: true,
  };

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

  return (
    <div className="productinfopopup__left vertical">
      <div className="main-img">{createMainSlider(data)}</div>
      <div
        className={
          data.length > 1 ? "subimg-container" : "subimg-container special"
        }
      >
        {createSubSlider(data)}
      </div>
    </div>
  );
};

export default LeftImageSlider;
