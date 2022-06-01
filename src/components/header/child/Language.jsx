import { useDispatch } from "react-redux";

import { languageActions } from "../../../store/languages/actions";

const Language = (props) => {
  let { language } = props;
  const dispatch = useDispatch();

  function changeLanguage(code) {
    if (code !== language.current) {
      dispatch(languageActions.changeLanguage(code));
    }
  }

  return (
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
      <div className="cart-btn">
        <a href="#">
          <i className="fa-solid fa-cart-shopping"></i>
        </a>
      </div>
    </div>
  );
};

export default Language;
