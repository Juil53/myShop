import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";

import { utils, debounce } from "../../../utils";
import { selectCart } from "../../../store/cart/selectors";
import { CART_ACTIONS, LOADING_STATUS } from "../../../constants";

const TopNav = () => {
  const language = useSelector((state) => state.languages);
  const cart = useSelector(selectCart);
  const [searchKey, setSearchKey] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (cart.status === LOADING_STATUS.IDLE) {
      dispatch({ type: CART_ACTIONS.GET_CART });
    }
  });

  const handleSearch = () => {
    if (!searchKey) return;
    document.location.href = "/product?query=" + searchKey;
    console.log(searchKey);
  };

  //Tri hoan thuc thi ham
  const debounceSearch = useCallback(
    debounce((value) => {
      console.log(value);
      setSearchKey(value);
    }, 100),
    []
  );

  function handleChangeInput({ target }) {
    const { value } = target;
    debounceSearch(value);
  }

  function handleKeyDown(e) {
    if (e.code === "Enter") {
      handleSearch();
    }
  }

  const SearchBox = () => {
    return (
      <div className="nav-btn search-box">
        <button onClick={handleSearch}>
          <i className="fa-solid fa-magnifying-glass" />
        </button>
        <input
          type="text"
          onChange={handleChangeInput}
          onKeyDown={handleKeyDown}
          placeholder={language.header.top_nav.search[language.current]}
        />
      </div>
    );
  };

  const createMoreInfo = (data) => {
    if (data && data.length && data.length > 0) {
      return data.map((v) => <span key={v}>{v}</span>);
    }
  };

  const createProductList = (data) => {
    if (data && data.length && data.length > 0) {
      return data.map((v, i) => (
        <div className="product-item row" key={"product_item" + v.id + i}>
          <div className="img">
            <img src={v.image} alt="" />
          </div>
          <div className="info">
            <a className="name">{v.name}</a>
            <div className="more-info">
              {Object.values(v.optionSelected) &&
                createMoreInfo(Object.values(v.optionSelected))}
            </div>
            <div className="price">
              {utils.priceBreak(v.priceAfterDiscount)}₫
            </div>
            <div className="quantity">
              Số lượng: <span>{v.quantity}</span>
            </div>
          </div>
        </div>
      ));
    }
  };

  return (
    <React.Fragment>
      <div className="header__top-nav row">
        <div className="nav-btn nav-btn-phone">
          <i className="fa-solid fa-phone"></i>
          19009597
        </div>
        {SearchBox()}
        <div className="nav-btn login-btn">
          <a href="/sign">
            <i className="fa-solid fa-user" />
            {language.header.top_nav.login[language.current]}
          </a>
        </div>
        <div className="nav-btn register-btn">
          <a href="/login">
            <i className="fa-solid fa-lock-open"></i>
            {language.header.top_nav.register[language.current]}
          </a>
        </div>
        <div className="nav-btn cart-btn">
          <a href="cart">
            <i className="fa-solid fa-cart-shopping"></i>
            {language.header.top_nav.cart[language.current]}
          </a>
          <div className="cart-dropdown-container">
            {cart.data &&
            cart.data.productList &&
            cart.data.productList.length !== 0 ? (
              <div className="cart-dropdown-content">
                <div className="product-list">
                  {createProductList(cart.data.productList)}
                </div>
                <div className="sum row">
                  <div className="title">Total money: </div>
                  <div className="total-money">
                    {utils.priceBreak(cart.data.totalAmount)}₫
                  </div>
                </div>
                <div className="payment-btn button-style">Payment</div>
              </div>
            ) : (
              <div className="empty-cart">
                <div className="img">
                  <img src="/img/empty_cart.png" alt="" />
                </div>
                <div className="text">Your cart is empty</div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <div className="header-nav-phone row">
        {SearchBox()}
        <a href="sign" className="login-btn">
          <i className="fa-solid fa-user" />
        </a>
        <a href="cart" className="cart-btn">
          <i className="fa-solid fa-cart-shopping"></i>
        </a>
      </div> */}
    </React.Fragment>
  );
};

export default TopNav;
