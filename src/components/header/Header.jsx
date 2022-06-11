import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CATEGORY_ACTIONS,
  LOADING_STATUS,
  CART_ACTIONS,
} from "../../constants";
import { categoriesSelector } from "../../store/categories/selector";
import { selectCart } from "../../store/cart/selectors";

import HeaderNav from "./child/HeaderNav";
import CartButton from "./child/CartButton";
import SearchBar from "./child/SearchBar";
import { utils } from "../../utils";

export default function Header() {
  const { languages } = useSelector((state) => state);
  const { categories } = useSelector(categoriesSelector);
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    if (categories.status === LOADING_STATUS.IDLE) {
      dispatch({ type: CATEGORY_ACTIONS.GET_ALL_CATEGORIES });
    }
    if (cart.status === LOADING_STATUS.IDLE) {
      dispatch({ type: CART_ACTIONS.GET_CART });
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
          <div className="header__top-nav row">
            <div className="nav-btn nav-btn-phone">
              <i className="fa-solid fa-phone"></i>
              19009597
            </div>
            <SearchBar />
            <div className="nav-btn login-btn">
              <a href="/sign">
                <i className="fa-solid fa-user" />
                Sign in
              </a>
            </div>
            <div className="nav-btn register-btn">
              <a href="/login">
                <i className="fa-solid fa-lock-open"></i>
                Sign up
              </a>
            </div>
            {cart.data && <CartButton data={cart.data} />}
          </div>
        </div>
        <div className="header__nav row">
          <HeaderNav
            languages={languages}
            currentPage={currentPage}
            categories={categories}
          />
          <div className="header__nav-right">
            {cart.data && <CartButton data={cart.data} />}
          </div>
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
        <SearchBar />
        <div className="header-phone__right">
          <div className="nav-btn login-btn">
            <a href="/sign">
              <i className="fa-solid fa-user" />
            </a>
          </div>
          <div className="nav-btn cart-btn">
            <a href="/cart">
              <i className="fa-solid fa-cart-shopping" />
            </a>
            <span className="product-quantity">1</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
