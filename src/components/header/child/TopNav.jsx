import { useDispatch, useSelector } from "react-redux";

import { POPUP } from "../../../constants";
import { actions } from "../../../store/page/slice";

const TopNav = () => {
  const dispatch = useDispatch();
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

  //LOGIN EVENT
  function login() {
    dispatch(actions.activePopup({ type: POPUP.LOGIN_POPUP }));
  }

  return (
    <div className="header__top-nav row">
      <div className="nav-btn nav-btn-phone">
        <i className="fa-solid fa-phone"></i>
        19009597
      </div>
      <SearchBox />
      <div className="nav-btn login-btn">
        <button onClick={login}>
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
