const HeaderNav = (props) => {
  const { languages, currentPage, categories } = props;

  const createSubCategory = (data) => {
    return data.map((v) => {
      return (
        <a href="#" key={v.id}>
          {v.name}
        </a>
      );
    });
  };

  const createMegaDropdown = (data) => {
    if (data.length !== 0) {
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
  };

  return (
    <div className="header__nav-left row">
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
            : "product-btn"
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
        <a href="/contact">{languages.header.nav.contact[languages.current]}</a>
      </div>
    </div>
  );
};

export default HeaderNav;
