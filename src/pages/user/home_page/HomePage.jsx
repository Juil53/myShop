import React, { useEffect } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";

import { LOADING_STATUS } from "../../../constants";

import { pageSelector } from "../../../store/page/selector";
import { productSelector } from "../../../store/products/selector";
import { categoriesSelector } from "../../../store/categories/selector";
import { actions as productActions } from "../../../store/products/slice";
import { actions as categoryActions } from "../../../store/categories/slice";
import { actions as pageActions } from "../../../store/page/slice";

import ProductSection from "../../../components/user/product_section/ProductSection";
import NextButton from "../../../components/user/product_section/child/NextButton";
import PreButton from "../../../components/user/product_section/child/PreButton";
import Loading from "../../../components/loading/Loading";
import Banner from "./child/Banner";
import LoadingFail from "../../../components/loading_fail/LoadingFail";
import MainLeft from "./child/MainLeft";
import localStorage from "../../../service/localStorage";
import ScrollToTop from "../../../components/user/scroll_to_top/ScrollToTop";

export default function HomePage() {
  const dispatch = useDispatch();
  const { banners } = useSelector(pageSelector);
  const { hotProducts, newProducts, bestSellingProducts } =
    useSelector(productSelector);
  const { categories } = useSelector(categoriesSelector);

  const bannerSetting = {
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
      dispatch(pageActions.fetchBannersRequest());
    }
    if (hotProducts.status === LOADING_STATUS.IDLE) {
      dispatch(productActions.fetchHotProductsRequest());
    }
    if (newProducts.status === LOADING_STATUS.IDLE) {
      dispatch(productActions.fetchNewProductsRequest());
    }
    if (categories.status === LOADING_STATUS.IDLE) {
      dispatch(categoryActions.fetchCategoriesRequest());
    }
    if (bestSellingProducts.status === LOADING_STATUS.IDLE) {
      dispatch(productActions.fetchBestSellingRequest());
    }
  }, []);

  function createBanner(data) {
    if (data) {
      if (data.length !== 0) {
        return data.map((v) => (
          <div className="slide" key={v}>
            <div className="img-container">
              <img src={v.image} alt="" />
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
            <Slider {...bannerSetting}>{createBanner(banners.data)}</Slider>
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
