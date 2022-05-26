import { useSelector } from "react-redux";
import { useCallback, useState } from "react";

import { utils, debounce } from "../../../utils";

const TopNav = () => {
  const language = useSelector((state) => state.languages);
  const [searchKey, setSearchKey] = useState("");

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

  const SearchBox = (action) => {
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

  return (
    <div className="header__top-nav row">
      <div className="nav-btn nav-btn-phone">
        <i className="fa-solid fa-phone"></i>
        19009597
      </div>
      {SearchBox(handleSearch)}
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
        <a href="/cart">
          <i className="fa-solid fa-cart-shopping"></i>
          {language.header.top_nav.cart[language.current]}
        </a>
        <div className="cart-dropdown-container">
          <div className="cart-dropdown-content">
            <div className="product-list">
              <div className="product-item row">
                <div className="img">
                  <img src="/img/sp1.png" alt="" />
                </div>
                <div className="info">
                  <a className="name">
                    Giày tây nâu đỏ thương hiệu Converse all star
                  </a>
                  <div className="more-info">Màu nâu</div>
                  <div className="price">{utils.priceBreak(500000)}₫</div>
                  <div className="quantity">
                    Số lượng: <span>1</span>
                  </div>
                </div>
                <div className="delete-btn">
                  <i className="fa-solid fa-trash"></i>
                </div>
              </div>
            </div>
            <div className="sum row">
              <div className="title">Total money: </div>
              <div className="total-money">{utils.priceBreak(1500000)}₫</div>
            </div>
            <div className="payment-btn button-style">Payment</div>
          </div>
          <div className="empty-cart">
            <div className="img">
              <img src="/img/empty_cart.png" alt="" />
            </div>
            <div className="text">Your cart is empty</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
