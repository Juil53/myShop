import { useSelector } from "react-redux";

const TopNav = () => {
  const language = useSelector((state) => state.languages);

  const SearchBox = () => {
    return (
      <div className="nav-btn search-box">
        <button>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <input
          type="text"
          placeholder={language.header.top_nav.search[language.current]}
        />
      </div>
    );
  };

  return (
    <div className="header__top-nav row">
      <div className="nav-btn">
        <i className="fa-solid fa-phone"></i>
        19009597
      </div>
      <SearchBox />
      <div className="nav-btn login-btn">
        <button>
          <i className="fa-solid fa-user"></i>
          {language.header.top_nav.login[language.current]}
        </button>
      </div>
      <div className="nav-btn register-btn">
        <button>
          <i className="fa-solid fa-lock-open"></i>
          {language.header.top_nav.register[language.current]}
        </button>
      </div>
      <div className="nav-btn cart-btn">
        <button>
          <i className="fa-solid fa-cart-shopping"></i>
          {language.header.top_nav.cart[language.current]}
        </button>
      </div>
    </div>
  );
};

export default TopNav;
