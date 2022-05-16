import React, { useEffect } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";

import { LOADING_STATUS, PAGE_ACTIONS, POPUP } from "../../../constants";
import { pageSelector } from "../../../store/page/selector";

import ProductSection from "../../../components/product_section/ProductSection";
import NextButton from "../../../components/product_section/child/NextButton";
import PreButton from "../../../components/product_section/child/PreButton";
import CategoryCard from "../../../components/category_card/CategoryCard";
import ProductCard from "../../../components/product_card/ProductCard";
import Loading from "../../../components/loading/Loading";
import Popup from "../../../components/popup/Popup";
import Banner from "./child/Banner";
import { actions } from "../../../store/page/slice";

export default function HomePage() {
  const dispatch = useDispatch();
  const { banners } = useSelector(pageSelector);
  const banner_settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextButton />,
    prevArrow: <PreButton />,
    autoplay: true,
    autoplaySpeed: 4000,
    dots: true,
  };

  useEffect(() => {
    if (banners.status === LOADING_STATUS.LOADING) {
      dispatch({ type: PAGE_ACTIONS.GET_BANNERS });
    }
  }, []);

  function createBanner(data) {
    return data.map((v) => (
      <div className="slide" key={v}>
        <div className="img-container">
          <img src={v} alt="" />
        </div>
      </div>
    ));
  }

  return (
    <React.Fragment>
      {banners.status === LOADING_STATUS.LOADING ? (
        <Loading />
      ) : (
        <div className="home-page page">
          <div className="home-page__slider">
            <Slider {...banner_settings}>{createBanner(banners.data)}</Slider>
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
      )}
      <Popup />
    </React.Fragment>
  );
}
