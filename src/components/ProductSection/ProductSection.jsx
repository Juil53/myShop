import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { constant } from "../../constants";
import { productActions } from "../../store/actions/productActions";
import Popup from "../Popup/Popup";
import ProductCard from "../ProductCard/ProductCard";
import NextButton from "./child/NextButton";
import PreButton from "./child/PreButton";
export default function ProductSection(props) {
  let { data, title } = props;
  const dispatch = useDispatch();
  const product = useSelector((store) => store.product.products);
  useEffect(() => {
    if (product.status === constant.LOADING) {
      dispatch(productActions.getAllProduct());
    } else {
      console.log(product);
    }
  });
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
  function createProductCard(data) {
    return data.map((v) => (
      <div className="productsection__slide-container">
        <ProductCard
          cardDirection="vertical"
          name={v.name}
          price_after_discount={v.price_after_discount}
          price_before_discount={v.price_before_discount}
          img={v.image}
          attributes={v.attributes}
          quantity={v.quantity}
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
      <Popup />
    </div>
  );
}
