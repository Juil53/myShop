const HeaderNav = (props) => {
  const { languages, currentPage, categories } = props;

  const createSubCategory = (data) => {
    return data.map((v) => {
      return (
        <a className="sub-category-btn" href="#" key={v.id}>
          {v.name}
        </a>
      );
    });
  };

  const createMegaDropdown = (data) => {
    if (data && !data.length && data.length > 0) {
      return data.map((v) => {
        return (
          <div className="mega__dropdown-content" key={v.id}>
            <a href="#" className="category-btn">
              {v.name}
            </a>
            {v.subCate && (
              <div className="sub-category vertical">
                {createSubCategory(v.subCate)}
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
          <a href="/">
            <i className="fa-solid fa-house"></i>
            {languages.header.nav.home[languages.current]}
          </a>
        </div>
        <div
          className={
            currentPage === "product"
              ? "active header__nav-btn product-btn"
              : "product-btn header__nav-btn"
          }
        >
          <a href="/product">
            {languages.header.nav.product[languages.current]}
            <i className="fa-solid fa-chevron-down"></i>
          </a>
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
          <a href="/about">{languages.header.nav.about[languages.current]}</a>
        </div>
        <div
          className={
            currentPage === "news"
              ? "active header__nav-btn news-btn"
              : "header__nav-btn news-btn"
          }
        >
          <a href="/news">{languages.header.nav.news[languages.current]}</a>
        </div>
        <div
          className={
            currentPage === "map"
              ? "active header__nav-btn map-btn"
              : "header__nav-btn map-btn"
          }
        >
          <a href="/map">{languages.header.nav.map[languages.current]}</a>
        </div>
        <div
          className={
            currentPage === "contact"
              ? "active header__nav-btn contact-btn"
              : "header__nav-btn contact-btn"
          }
        >
          <a href="/contact">
            {languages.header.nav.contact[languages.current]}
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeaderNav;
