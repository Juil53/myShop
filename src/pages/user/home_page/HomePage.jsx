import React, { useEffect } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";

import {
  CATEGORY_ACTIONS,
  LOADING_STATUS,
  PAGE_ACTIONS,
  PRODUCT_ACTIONS,
  USER_ACTIONS,
} from "../../../constants";

import { pageSelector } from "../../../store/page/selector";
import { productSelector } from "../../../store/products/selector";
import { categoriesSelector } from "../../../store/categories/selector";

import ProductSection from "../../../components/user/product_section/ProductSection";
import NextButton from "../../../components/user/product_section/child/NextButton";
import PreButton from "../../../components/user/product_section/child/PreButton";
import Loading from "../../../components/loading/Loading";
import Banner from "./child/Banner";
import LoadingFail from "../../../components/loading_fail/LoadingFail";
import MainLeft from "./child/MainLeft";
import localStorage from "../../../service/localStorage";
import ScrollToTop from "../../../components/user/scroll_to_top/ScrollToTop";
//import api from "../../../service/api";

export default function HomePage() {
  const dispatch = useDispatch();
  const { banners } = useSelector(pageSelector);
  const { hotProducts, newProducts, bestSellingProducts } =
    useSelector(productSelector);
  const { categories } = useSelector(categoriesSelector);
  //const userLogin = localStorage.get("user");

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
    if (banners.status === LOADING_STATUS.IDLE) {
      dispatch({ type: PAGE_ACTIONS.GET_BANNERS });
    }
    if (hotProducts.status === LOADING_STATUS.IDLE) {
      dispatch({ type: PRODUCT_ACTIONS.GET_HOT_PRODUCTS });
    }
    if (newProducts.status === LOADING_STATUS.IDLE) {
      dispatch({ type: PRODUCT_ACTIONS.GET_NEW_PRODUCTS });
    }
    if (categories.status === LOADING_STATUS.IDLE) {
      dispatch({ type: CATEGORY_ACTIONS.GET_ALL_CATEGORIES });
    }
    if (bestSellingProducts.status === LOADING_STATUS.IDLE) {
      dispatch({ type: PRODUCT_ACTIONS.GET_BEST_SELLING_PRODUCTS });
    }
    //api.get("user");
  }, []);

  function createBanner(data) {
    if (data) {
      if (data.length !== 0) {
        return data.map((v) => (
          <div className="slide" key={v}>
            <div className="img-container">
              <img src={v} alt="" />
            </div>
          </div>
        ));
      }
    }
  }

  return (
    <React.Fragment>
      {banners.status === LOADING_STATUS.LOADING ||
      hotProducts.status === LOADING_STATUS.LOADING ||
      newProducts.status === LOADING_STATUS.LOADING ||
      bestSellingProducts.status === LOADING_STATUS.LOADING ||
      categories.status === LOADING_STATUS.LOADING ? (
        <Loading />
      ) : banners.status === LOADING_STATUS.FAIL &&
        hotProducts.status === LOADING_STATUS.FAIL &&
        newProducts.status === LOADING_STATUS.FAIL &&
        bestSellingProducts.status === LOADING_STATUS.FAIL &&
        categories.status === LOADING_STATUS.FAIL ? (
        <LoadingFail />
      ) : (
        <div className="home-page page" id="page">
          <ScrollToTop />
          <div className="home-page__slider">
            <Slider {...banner_settings}>{createBanner(banners.data)}</Slider>
          </div>
          <div className="home-page__main row">
            <MainLeft
              categories={categories.data}
              data={bestSellingProducts.data}
            />
            <div className="home-page__main-right">
              {hotProducts.data.length !== 0 &&
                hotProducts.data.length >= 3 && (
                  <ProductSection title="Hot product" data={hotProducts.data} />
                )}
              <div className="banner-container">
                <Banner img="/img/banner.png" name="New Fashion Sale" />
              </div>
              {newProducts.data.length !== 0 &&
                newProducts.data.length >= 3 && (
                  <ProductSection title="New product" data={newProducts.data} />
                )}
              <div className="banner-container">
                <Banner img="/img/banner.png" name="Trending Sale" />
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
