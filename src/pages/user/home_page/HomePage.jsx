import React from "react";
import Slider from "react-slick";

import ProductSection from "../../../components/product_section/ProductSection";
import ProductCard from "../../../components/product_card/ProductCard";
import CategoryCard from "../../../components/category_card/CategoryCard";
import NextButton from "../../../components/product_section/child/NextButton";
import PreButton from "../../../components/product_section/child/PreButton";
import Banner from "./child/Banner";
import Popup from "../../../components/popup/Popup";

export default function HomePage() {
  const banner_settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextButton />,
    prevArrow: <PreButton />,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <React.Fragment>
      <div className="home-page page">
        <div className="home-page__slider">
          <Slider {...banner_settings}>
            <div className="slide">
              <div className="img-container">
                <img src="./img/banner1.jpeg" alt="" />
              </div>
            </div>
            <div className="slide">
              <div className="img-container">
                <img src="./img/banner2.jpg" alt="" />
              </div>
            </div>
            <div className="slide">
              <div className="img-container">
                <img src="./img/banner3.jpg" alt="" />
              </div>
            </div>
          </Slider>
        </div>
        <div className="home-page__main row">
          <div className="home-page__main-left">
            <CategoryCard />
            <div className="topic">
              <div className="topic-title">Best selling</div>
              <div className="topic-content">
                <ProductCard
                  cardDirection="row"
                  name="Áo thun ba lỗ"
                  price_after_discount="200000"
                  price_before_discount="400000"
                  img="./img/sp1.png"
                />
                <ProductCard
                  cardDirection="row"
                  name="Áo thun ba lỗ"
                  price_after_discount="200000"
                  price_before_discount="400000"
                  img="./img/sp1.png"
                />
                <ProductCard
                  cardDirection="row"
                  name="Áo thun ba lỗ"
                  price_after_discount="200000"
                  price_before_discount="400000"
                  img="./img/sp1.png"
                />
              </div>
              <div className="topic-btn">
                <a href="#">See more</a>
              </div>
            </div>
          </div>
          <div className="home-page__main-right">
            <ProductSection title="Hot product" data="data" />
            <div className="banner-container">
              <Banner />
            </div>
            <ProductSection title="Discount product" data="data" />
          </div>
        </div>
      </div>
      <Popup />
    </React.Fragment>
  );
}