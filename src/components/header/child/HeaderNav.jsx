import { constant } from "../../../constants";

const HeaderNav = (props) => {
  let { language, currentPage, category } = props;

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
    <div className="header__nav-left row">
      <div
        className={
          currentPage === "home"
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
          currentPage === "product" ? "active product-btn" : "product-btn"
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
          currentPage === "about"
            ? "active header__nav-btn about-btn"
            : "header__nav-btn about-btn"
        }
      >
        <a href="#">{language.header.nav.about[language.current]}</a>
      </div>
      <div
        className={
          currentPage === "news"
            ? "active header__nav-btn news-btn"
            : "header__nav-btn news-btn"
        }
      >
        <a href="#">{language.header.nav.news[language.current]}</a>
      </div>
      <div
        className={
          currentPage === "map"
            ? "active header__nav-btn map-btn"
            : "header__nav-btn map-btn"
        }
      >
        <a href="#">{language.header.nav.map[language.current]}</a>
      </div>
      <div
        className={
          currentPage === "contact"
            ? "active header__nav-btn contact-btn"
            : "header__nav-btn contact-btn"
        }
      >
        <a href="#">{language.header.nav.contact[language.current]}</a>
      </div>
    </div>
  );
};

export default HeaderNav;
