import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { pageSelector } from "../../store/page/selector";
import { actions } from "../../store/page/slice";
import { POPUP } from "../../constants";

import ProductInfoPopup from "./child/ProductInfo/ProductInfoPopup";
import Login from "./child/Login/Login";

export default function Popup() {
  const { popup } = useSelector(pageSelector);
  const { active } = popup || [];
  const dispatch = useDispatch();

  const createPopup = (type, data) => {
    switch (type) {
      case POPUP.PRODUCT_INFO_POPUP:
        return (
          <ProductInfoPopup
            closePopup={() => handleClosePopup(type)}
            data={data}
          />
        );
      case POPUP.LOGIN_POPUP:
        return <Login closePopup={() => handleClosePopup(type)} />;
      default:
        return <></>;
    }
  };

  const createPopups = () => {
    return active.map((v) => {
      return (
        <React.Fragment key={v.type}>
          {createPopup(v.type, v.data)}
        </React.Fragment>
      );
    });
  };

  function handleClosePopup(type) {
    dispatch(actions.hidePopup(type));
  }

  useEffect(() => {
    const body = document.body;
    const scrollbarWidth = window.innerWidth - body.clientWidth + "px";

    if (active.length) {
      body.classList.add("has-popup");
      body.style.paddingRight = scrollbarWidth;
    } else {
      body.classList.remove("has-popup");
      body.style.paddingRight = "0";
    }
  }, [active]);

  return <>{createPopups()}</>;
}
