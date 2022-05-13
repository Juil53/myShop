import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";

import { constant } from "../../constants";
import { fetchHotProduct } from "../../store/products/actions";
import ProductCard from "../product-card/ProductCard";
import NextButton from "./child/NextButton";
import PreButton from "./child/PreButton";

export default function ProductSection(props) {
  const { data, title } = props;
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.product);

  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 2,
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

  useEffect(() => {
    if (product.status === constant.LOADING) {
      dispatch(fetchHotProduct());
    }
  });

  function createProductCard(data) {
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
  }

  return (
    <div className="productsection">
      <h3 className="productsection__title">{title}</h3>
      <div className="productsection__slide">
        {product.status !== constant.LOADING && (
          <Slider {...settings}>{createProductCard(product.data)}</Slider>
        )}
      </div>
    </div>
  );
}