import React from "react";
import ProductSection from "../../../components/productsection/ProductSection";
import ProductCard from "../../../components/productcard/ProductCard";
import Header from "../../../components/header/Header";
import CategoryCard from "../../../components/categorycard/CategoryCard";
import Footer from "../../../components/footer/Footer";
import NextButton from "../../../components/productsection/child/NextButton";
import PreButton from "../../../components/productsection/child/PreButton";
import Popup from "../../../components/popup/Popup";
import Slider from "react-slick";
import Banner from "./child/Banner";
export default function HomePage() {
  const bannerSettings = {
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextButton />,
    prevArrow: <PreButton />,
  };
  return (
    <div className="page" id="page">
      <Header currentactive="home" />
      <div className="home-page">
        <div className="home-page__slider">
          <Slider {...bannerSettings}>
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
      <Footer />
      <Popup />
    </div>
  );
}
