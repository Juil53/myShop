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
    if (data.length <= 9) {
      return data.map((v) => (
        <div className="productsection__slide-container" key={v.id}>
          <ProductCard
            id={v.id}
            cardDirection="vertical"
            name={v.name}
            price_after_discount={v.price_after_discount}
            price_before_discount={v.price_before_discount}
            img={v.image}
            attributes={v.attributes}
            quantity={v.quantity}
            status={v.status}
            brand={v.brand}
          />
        </div>
      ));
    } else {
      let tmp = [...data];
      const afterSplice = tmp.splice(0, 9);

      return afterSplice.map((v) => (
        <div className="productsection__slide-container" key={v.id}>
          <ProductCard
            id={v.id}
            cardDirection="vertical"
            name={v.name}
            price_after_discount={v.price_after_discount}
            price_before_discount={v.price_before_discount}
            img={v.image}
            attributes={v.attributes}
            quantity={v.quantity}
            status={v.status}
            brand={v.brand}
          />
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
