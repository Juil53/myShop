import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LOADING_STATUS, USER_ACTIONS } from "../../../constants";
import { categoriesSelector } from "../../../store/categories/selector";
import { selectCart } from "../../../store/cart/selectors";
import { actions as categoryActions } from "../../../store/categories/slice";
import { actions as cartActions } from "../../../store/cart/slice";

import HeaderNav from "./child/HeaderNav";
import CartButton from "./child/CartButton";
import SearchBar from "./child/SearchBar";
import User from "./child/User";
import { clientData } from "../../../store/clients/selector";
import localStorage from "../../../service/localStorage";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { languages } = useSelector((state) => state);
  const { categories } = useSelector(categoriesSelector);
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const client = useSelector(clientData);
  const token = localStorage.get("token");

  const { pathname } = useLocation();

  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    if (categories.status === LOADING_STATUS.IDLE) {
      dispatch(categoryActions.fetchCategoriesRequest());
    }
    if (cart.status === LOADING_STATUS.IDLE) {
      dispatch(cartActions.fetchCartRequest());
    }
    if (token && client.status === LOADING_STATUS.IDLE) {
      dispatch({ type: USER_ACTIONS.GET_USER_INFO });
    }
  }, []);

  useEffect(() => {
    const currentActiveTab = pathname.split("/")[1];
    if (currentActiveTab !== "") {
      setCurrentPage(currentActiveTab);
    } else {
      setCurrentPage("home");
    }
  });

  function menuClick() {
    const menu_btn = document.querySelector(".phone-menu-btn");
    menu_btn.classList.toggle("phone-menu-active");
  }

  return (
    <React.Fragment>
      <div className="header">
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
        <div className="header__top row">
          <div className="header__top-logo">
            <div className="img-container">
              <img src="/img/logomyShop.png" alt="" style={{width:'30%',objectFit:'contain'}}/>
            </div>
          </div>
          <SearchBar />
          <div className="header__top-nav row">
            {client?.status === LOADING_STATUS.SUCCESS && token ? (
              <User data={client.info} />
            ) : (
              <>
                <div className="nav-btn login-btn">
                  <Link to="/sign">
                    <i className="fa-solid fa-user" />
                    Sign in
                  </Link>
                </div>
              </>
            )}
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
              <Link to="/">Home</Link>
            </div>
            <div className="dropdown-menu-btn">
              <Link to="/product">Product</Link>
            </div>
            <div className="dropdown-menu-btn">
              <Link to="/about">About</Link>
            </div>
            <div className="dropdown-menu-btn">
              <Link to="/">News</Link>
            </div>
            <div className="dropdown-menu-btn">
              <Link to="/map">Map</Link>
            </div>
          </div>
        </div>
        <SearchBar />
        <div className="header-phone__right">
          <div className="nav-btn login-btn">
            {client?.status === LOADING_STATUS.SUCCESS && token ? (
              <Link to="/user">
                <i className="fa-solid fa-user" />
              </Link>
            ) : (
              <Link to="/sign">
                <i className="fa-solid fa-user" />
              </Link>
            )}
          </div>
          <div className="nav-btn cart-btn">
            <Link to="/cart">
              <i className="fa-solid fa-cart-shopping" />
            </Link>
            <span className="product-quantity">1</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
