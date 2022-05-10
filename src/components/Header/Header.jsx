import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { constant } from "../../constants";
import { categoryAction } from "../../store/actions/CategoryAction";
import { languageActions } from "../../store/actions/LanguageActions";

export default function Header(props) {
  const { currentactive } = props;
  const language = useSelector((store) => store.language);
  const category = useSelector((store) => store.category.category);
  const dispatch = useDispatch();

  useEffect(() => {
    if (category.status === constant.LOADING) {
      dispatch(categoryAction.getAllCategory());
    }
  });

  function changeLanguage(code) {
    if (code !== language.current) {
      dispatch(languageActions.changeLanguage(code));
    }
  }

  function createMegaDropdown(data) {
    return data.map((v) => {
      return (
        <div className="mega__dropdown-content" key={v.id}>
          <a href="#" className="category">
            {v.name}
          </a>
          {v.sub_cate && (
            <div className="sub-category vertical">
              {createSubCategory(v.sub_cate)}
            </div>
          )}
        </div>
      );
    });
  }

  function createSubCategory(data) {
    return data.map((v) => {
      return (
        <a href="#" key={v.id}>
          {v.name}
        </a>
      );
    });
  }

  return (
    <div className="header">
      <div className="header__top row">
        <div className="header__top-logo">
          <div className="img-container">
            <img src="./img/logomyShop.png" alt="" />
          </div>
        </div>
        <div className="header__top-nav row">
          <div className="header__top-nav-btn">
            <i className="fa-solid fa-phone"></i>
            19009597
          </div>
          <div className="header__top-nav-btn search-box">
            <button>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <input
              type="text"
              placeholder={language.header.top_nav.search[language.current]}
            />
          </div>
          <div className="header__top-nav-btn login-btn">
            <button>
              <i className="fa-solid fa-user"></i>
              {language.header.top_nav.login[language.current]}
            </button>
          </div>
          <div className="header__top-nav-btn register-btn">
            <button>
              <i className="fa-solid fa-lock-open"></i>
              {language.header.top_nav.register[language.current]}
            </button>
          </div>
          <div className="header__top-nav-btn cart-btn">
            <button>
              <i className="fa-solid fa-cart-shopping"></i>
              {language.header.top_nav.login[language.current]}
            </button>
          </div>
        </div>
      </div>
      <div className="header__nav row">
        <div className="header__nav-left row">
          <div
            className={
              currentactive === "home"
                ? "active header__nav-btn home-btn"
                : "header__nav-btn home-btn"
            }
          >
            <a href="#">
              <i className="fa-solid fa-house"></i>
              {language.header.nav.home[language.current]}
            </a>
          </div>
          <div
            className={
              currentactive === "product" ? "active product-btn" : "product-btn"
            }
          >
            <a href="#">
              {language.header.nav.product[language.current]}
              <i className="fa-solid fa-chevron-down"></i>
            </a>
            <div className="mega__dropdown row">
              {category.status !== constant.LOADING &&
                createMegaDropdown(category.data)}
            </div>
          </div>
          <div
            className={
              currentactive === "about"
                ? "active header__nav-btn about-btn"
                : "header__nav-btn about-btn"
            }
          >
            <a href="#">{language.header.nav.about[language.current]}</a>
          </div>
          <div
            className={
              currentactive === "news"
                ? "active header__nav-btn news-btn"
                : "header__nav-btn news-btn"
            }
          >
            <a href="#">{language.header.nav.news[language.current]}</a>
          </div>
          <div
            className={
              currentactive === "map"
                ? "active header__nav-btn map-btn"
                : "header__nav-btn map-btn"
            }
          >
            <a href="#">{language.header.nav.map[language.current]}</a>
          </div>
          <div
            className={
              currentactive === "contact"
                ? "active header__nav-btn contact-btn"
                : "header__nav-btn contact-btn"
            }
          >
            <a href="#">{language.header.nav.contact[language.current]}</a>
          </div>
        </div>
        <div className="header__nav-right row">
          <button
            className="vi-btn"
            onClick={() => {
              changeLanguage("VI");
            }}
          >
            VI
          </button>
          <button
            onClick={() => {
              changeLanguage("ENG");
            }}
          >
            ENG
          </button>
        </div>
      </div>
    </div>
  );
}
