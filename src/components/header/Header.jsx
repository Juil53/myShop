import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CATEGORY_ACTIONS, LOADING_STATUS } from "../../constants";
import { categoriesSelector } from "../../store/categories/selector";

import HeaderNav from "./child/HeaderNav";
import Language from "./child/Language";
import TopNav from "./child/TopNav";

export default function Header() {
  const { languages } = useSelector((state) => state);
  const { categories } = useSelector(categoriesSelector);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    if (categories.status === LOADING_STATUS.IDLE) {
      dispatch({ type: CATEGORY_ACTIONS.GET_ALL_CATEGORIES });
    }
  }, []);

  useEffect(() => {
    const path = window.location.pathname;
    const currentActiveTab = path.split("/")[1];
    if (currentActiveTab !== "") {
      setCurrentPage(currentActiveTab);
    }
  }, []);

  function menuClick() {
    const menu_btn = document.querySelector(".phone-menu-btn");
    menu_btn.classList.toggle("phone-menu-active");
  }

  return (
    <React.Fragment>
      <div className="header">
        <div className="header__top row">
          <div className="header__top-logo">
            <div className="img-container">
              <img src="/img/logomyShop.png" alt="" />
            </div>
          </div>
          <TopNav />
        </div>
        <div className="header__nav row">
          <HeaderNav
            languages={languages}
            currentPage={currentPage}
            categories={categories}
          />
          <Language language={languages} />
        </div>
      </div>
      <div className="header-phone">
        <div className="header-phone__menu">
          <div className="phone-menu-btn" onClick={menuClick}>
            <span className="icon1"></span>
            <span className="icon2"></span>
            <span className="icon3"></span>
          </div>
          <div className="dropdown-menu">
            <div className="dropdown-menu-btn">
              <i className="fa-solid fa-house"></i>
              <a href="/">Home</a>
            </div>
            <div className="dropdown-menu-btn">
              <a href="/">Product</a>
            </div>
            <div className="dropdown-menu-btn">
              <a href="/">About</a>
            </div>
            <div className="dropdown-menu-btn">
              <a href="/">News</a>
            </div>
            <div className="dropdown-menu-btn">
              <a href="/">Map</a>
            </div>
          </div>
        </div>
        <TopNav />
      </div>
    </React.Fragment>
  );
}
