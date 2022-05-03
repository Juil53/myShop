import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { constant } from "../../constants";
import { productActions } from "../../store/actions/productActions";
import Popup from "../Popup/Popup";
import ProductCard from "../ProductCard/ProductCard";
export default function ProductSection(props) {
  let { data, title } = props;
  const dispatch = useDispatch();
  const product = useSelector((store) => store.product.products);
  console.log("abx");
  useEffect(() => {
    if (product.status === constant.LOADING) {
      dispatch(productActions.getAllProduct());
    } else {
      console.log(product);
    }
  });
  let att = [
    {
      name: "Thương hiệu",
      value: "Giày da cao cấp",
    },
    {
      name: "Bảo hành",
      value: "12 tháng",
    },
    {
      name: "Chất liệu",
      value: "Da",
    },
  ];
  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 2,
  };
  function createProductCard() {
    data.map((v) => {
      return (
        <div>
          <ProductCard
            carDirection="vertical"
            name={v.name}
            price_after_discount={v.price_after_discount}
            price_before_discount={v.price_before_discount}
            img={v.img}
            attributes={v.attributes}
            quantity={v.quantity}
          />
        </div>
      );
    });
  }
  return (
    <div className="productsection">
      <h3 className="productsection__title">{title}</h3>
      <div className="productsection__slide">
        <Slider {...settings}>
          <ProductCard
            carDirection="vertical"
            name="Giày da cá sấu cao cấp thương hiệu Nhật Bản Anh Mỹ Pháp đình"
            price_after_discount="500000"
            price_before_discount="700000"
            img="./img/sp1.png"
            attributes={att}
            quantity="10"
          />
          <ProductCard
            carDirection="vertical"
            name="Giày da cá sấu cao cấp thương hiệu Nhật Bản Anh Mỹ Pháp đình"
            price_after_discount="500000"
            price_before_discount="700000"
            img="./img/sp1.png"
            attributes={att}
            quantity="10"
          />
          <ProductCard
            carDirection="vertical"
            name="Giày da cá sấu cao cấp thương hiệu Nhật Bản Anh Mỹ Pháp đình"
            price_after_discount="500000"
            price_before_discount="700000"
            img="./img/sp1.png"
            attributes={att}
            quantity="10"
          />
          <ProductCard
            carDirection="vertical"
            name="Giày da cá sấu cao cấp thương hiệu Nhật Bản Anh Mỹ Pháp đình"
            price_after_discount="500000"
            price_before_discount="700000"
            img="./img/sp1.png"
            attributes={att}
            quantity="10"
          />
          <ProductCard
            carDirection="vertical"
            name="Giày da cá sấu cao cấp thương hiệu Nhật Bản Anh Mỹ Pháp đình"
            price_after_discount="500000"
            price_before_discount="700000"
            img="./img/sp1.png"
            attributes={att}
            quantity="10"
          />
          <ProductCard
            carDirection="vertical"
            name="Giày da cá sấu cao cấp thương hiệu Nhật Bản Anh Mỹ Pháp đình"
            price_after_discount="500000"
            price_before_discount="700000"
            img="./img/sp1.png"
            attributes={att}
            quantity="10"
          />
        </Slider>
      </div>
      <Popup />
    </div>
  );
}
