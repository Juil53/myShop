import React from "react";
import Quantity from "../../../components/quantity/Quantity";
import Slider from "react-slick";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectProductInfo } from "../../../store/products/selector";
import ProductTabs from "./ProductTabs";
import RelatedProducts from "./RelatedProducts";
import Breadcrumb from "../../../components/breadcumb/BreadCumb";

const ProductDetail = () => {
  const params = useParams();
  const [number, setNumber] = useState(1);
  const productInfo = useSelector((state) => selectProductInfo(state, params.id));
  const [mainSlider, setMainSlider] = useState();
  const [subSlider, setSubSlider] = useState();
  const { name } = productInfo;

  const array = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Product",
      url: "/product",
    },
    {
      name: name,
      url: "",
    },
  ];

  //NUMBER FORMATTER
  const formatter = new Intl.NumberFormat("vn-VN", {
    style: "currency",
    currency: "VND",
  });

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

  return (
    <React.Fragment>
      <div className="breadcumb">
        <Breadcrumb pages={array} />
      </div>
      <div className="product-detail row">
        <div className="product-detail__img">
          <div className="main-img">{createMainSlider(productInfo.image)}</div>
          <div className="sub-img">{createSubSlider(productInfo.image)}</div>
        </div>

        <div className="product-detail__info">
          <div className="product-detail__name">
            <h1>{productInfo.name}</h1>
          </div>

          <div className="row">
            <div className="product-detail__brand">
              <h4 className="">Brand:</h4>
              {productInfo.brand || "Updating"}
            </div>
            <div className="product-detail__status">
              <h4>Status:</h4>
              {productInfo.status || "Updating"}
            </div>
          </div>

          <div className="product-detail__price">
            <span className="price__afterdiscount">
              {formatter.format(productInfo.priceAfterDiscount) || "Updating"}
            </span>
            <span className="price__beforediscount">
              {formatter.format(productInfo.priceBeforeDiscount) || "Updating"}
            </span>
          </div>

          <div className="product-detail__attributes">
            {productInfo.attributes &&
              productInfo.attributes.length > 0 &&
              typeof productInfo.attributes !== "string" &&
              productInfo.attributes.map((v) => (
                <h4 key={v.name + "att"}>
                  {v.name}: <span>{v.value}</span>
                </h4>
              ))}
          </div>

          <div className="product-detail__quantity row">
            <div className="left">
              <h4>Quantity:</h4>
              <Quantity
                value={number}
                changeValue={setNumber}
                type="add"
                available={productInfo.available}
              />
            </div>
            <p className="right">
              Product Available <span>{productInfo.available}</span>{" "}
            </p>
          </div>

          <div className="product-detail__tag row">
            <h4>Tag:</h4>
            {productInfo.categories.map((cate, index) => (
              <span key={`cate_${index}`}>{cate}</span>
            ))}
          </div>

          <div className="product-detail__btn row">
            <button className="button button-style">
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <div className="product-detail__tabs">
        <ProductTabs product={productInfo}/>
      </div>

      <div className="product-detail__related">
        <RelatedProducts product={productInfo} />
      </div>
    </React.Fragment>
  );
};

export default ProductDetail;
