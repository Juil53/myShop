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
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function createSubSlider(data) {
    if (!data || data.length <= 1 || typeof data === "string") {
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
    if (!data) {
      return <></>;
    }

    if (typeof data === "string") {
      return (
        <Slider
          {...settings_mainSlider}
          asNavFor={subSlider}
          ref={(slider1) => setMainSlider(slider1)}
        >
          <div className="img-container">
            <img src={data} alt="" />
          </div>
        </Slider>
      );
    }
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
      <div className="subimg-container">{createSubSlider(data)}</div>
    </div>
  );
};

export default LeftImageSlider;
