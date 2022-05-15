import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LOADING_STATUS } from "../../constants";
import { categoriesSelector } from "../../store/categories/selector";

import HeaderNav from "./child/HeaderNav";
import Language from "./child/Language";
import TopNav from "./child/TopNav";

export default function Header() {
  const { languages } = useSelector((state) => state);
  const { data: categories } = useSelector(categoriesSelector);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    if (categories.status === LOADING_STATUS.LOADING) {
      dispatch({ type: "FETCH_CATEGORIES" });
    }
  }, []);

  useEffect(() => {
    const path = window.location.pathname;
    const currentActiveTab = path.split("/")[1];
    if (currentActiveTab !== "") {
      setCurrentPage(currentActiveTab);
    }
  }, []);

  return (
    <div className="header">
      <div className="header__top row">
        <div className="header__top-logo">
          <div className="img-container">
            <img src="/img/logomyShop.png" alt="" />
          </div>
        </div>
        <TopNav />
      </div>
      <div className="header__nav row">
        <HeaderNav
          languages={languages}
          currentPage={currentPage}
          categories={categories}
        />
        <Language language={languages} />
      </div>
    </div>
  );
}
