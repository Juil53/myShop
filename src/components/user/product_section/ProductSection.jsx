import Slider from "react-slick";

import ProductCard from "../product_card/ProductCard";
import NextButton from "./child/NextButton";
import PreButton from "./child/PreButton";

export default function ProductSection(props) {
  const { data, title } = props;

  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <NextButton />,
    prevArrow: <PreButton />,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
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

  function createProductCard(data) {
    if (!data) {
      return <></>;
    }
    if (data.length <= 9) {
      return data.map((v) => (
        <div className="productsection__slide-container" key={v.id}>
          <ProductCard cardDirection="vertical" data={v} />
        </div>
      ));
    } else {
      let tmp = [...data];
      const afterSplice = tmp.splice(0, 9);

      return afterSplice.map((v) => (
        <div className="productsection__slide-container" key={v.id}>
          <ProductCard cardDirection="vertical" data={v} />
        </div>
      ));
    }
  }

  return (
    <div className="productsection">
      <h3 className="productsection__title">{title}</h3>
      <div className="productsection__slide">
        <Slider {...settings}>{createProductCard(data)}</Slider>
      </div>
    </div>
  );
}
