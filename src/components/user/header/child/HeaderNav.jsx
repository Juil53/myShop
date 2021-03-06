import { Link } from "react-router-dom";

const HeaderNav = (props) => {
  const { currentPage, categories } = props;

  const createSubCategory = (data, mainCateID) => {
    return data.map((v) => {
      return (
        <Link
          className="sub-category-btn"
          to={`/product?category=${mainCateID}&subCate=${v.id}`}
          key={v.id}
        >
          {v.name}
        </Link>
      );
    });
  };

  const createMegaDropdown = (data) => {
    if (data && data.length && data.length > 0) {
      return data.map((v) => {
        return (
          <div className="mega__dropdown-content" key={v.id}>
            <Link to={`/product?category=${v.id}`} className="category-btn">
              {v.name}
            </Link>
            {v.subCate && (
              <div className="sub-category vertical">
                {createSubCategory(v.subCate, v.id)}
              </div>
            )}
          </div>
        );
      });
    }
  };

  //CLICK ON MENU BUTTON EVENT
  function menuClick() {
    const menu_btn = document.querySelector(".menu-btn");
    menu_btn.classList.toggle("menu-active");
  }

  return (
    <div className="header__nav-left row">
      <input type="checkbox" id="menu"></input>
      <label htmlFor="menu" className="menu-btn" onClick={menuClick}>
        <span className="icon1"></span>
        <span className="icon2"></span>
        <span className="icon3"></span>
      </label>
      <div className="header__nav-container">
        <div
          className={
            currentPage === "home"
              ? "active header__nav-btn home-btn"
              : "header__nav-btn home-btn"
          }
        >
          <Link to="/">
            <i className="fa-solid fa-house"></i>
            Home
          </Link>
        </div>
        <div
          className={
            currentPage === "product"
              ? "active header__nav-btn product-btn"
              : "product-btn header__nav-btn"
          }
        >
          <Link to="/product">
            Product
            <i className="fa-solid fa-chevron-down"></i>
          </Link>
          {categories.data && categories.data.length !== 0 && (
            <div className="mega__dropdown row">
              {createMegaDropdown(categories.data)}
            </div>
          )}
        </div>
        <div
          className={
            currentPage === "about"
              ? "active header__nav-btn about-btn"
              : "header__nav-btn about-btn"
          }
        >
          <Link to="/about">About</Link>
        </div>
        <div
          className={
            currentPage === "news"
              ? "active header__nav-btn news-btn"
              : "header__nav-btn news-btn"
          }
        >
          <Link to="/news">News</Link>
        </div>
        <div
          className={
            currentPage === "map"
              ? "active header__nav-btn map-btn"
              : "header__nav-btn map-btn"
          }
        >
          <Link to="/map">Map</Link>
        </div>
        <div
          className={
            currentPage === "contact"
              ? "active header__nav-btn contact-btn"
              : "header__nav-btn contact-btn"
          }
        >
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderNav;
