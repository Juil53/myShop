import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { constant } from "../../constants";
import { fetchCategories } from "../../store/categories/actions";

import HeaderNav from "./child/HeaderNav";
import Language from "./child/Language";
import TopNav from "./child/TopNav";

export default function Header(props) {
  const { currentPage } = props;
  const language = useSelector((state) => state.languages);
  const category = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    if (category.status === constant.LOADING) {
      dispatch(fetchCategories());
    }
  });

  return (
    <div className="header">
      <div className="header__top row">
        <div className="header__top-logo">
          <div className="img-container">
            <img src="./img/logomyShop.png" alt="" />
          </div>
        </div>
        <TopNav />
      </div>
      <div className="header__nav row">
        <HeaderNav
          language={language}
          currentPage={currentPage}
          category={category}
        />
        <Language language={language} />
      </div>
    </div>
  );
}
