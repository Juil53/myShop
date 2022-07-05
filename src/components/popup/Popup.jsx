import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { pageSelector } from "../../store/page/selector";
import { actions } from "../../store/page/slice";
import { POPUP } from "../../constants";

import ProductInfoPopup from "./child/product_info/ProductInfoPopup";
import AddCartPopup from "./child/add_cart_popup/AddCartPopup";
import SelectionPopup from "./child/selection_popup/SelectionPopup";
import WaitingPopup from "./child/waiting_popup/WaitingPopup";
import AddressPopup from "./child/address_popup/AddressPopup";
import SuccessPopup from "./child/success_popup/SuccessPopup";

export default function Popup() {
  const { popup } = useSelector(pageSelector);
  const [isActive, setIsActive] = useState(false);
  const { active = [] } = popup || {};
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

      case POPUP.ADD_CART_POPUP:
        return (
          <AddCartPopup closePopup={() => handleClosePopup(type)} data={data} />
        );

      case POPUP.SELECTION_POPUP:
        return (
          <SelectionPopup
            closePopup={() => handleClosePopup(type)}
            data={data}
          />
        );

      case POPUP.WAITING_POPUP:
        return <WaitingPopup />;

      case POPUP.ADD_ADDRESS_POPUP:
        return (
          <AddressPopup closePopup={() => handleClosePopup(type)} data={data} />
        );

      case POPUP.MESSAGE_POPUP:
        return (
          <SuccessPopup closePopup={() => handleClosePopup(type)} data={data} />
        );

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

    if (active.length && !isActive) {
      body.classList.add("has-popup");
      body.style.paddingRight = scrollbarWidth;
      setIsActive(true);
    }

    if (!active.length) {
      body.classList.remove("has-popup");
      body.style.paddingRight = "0";
      setIsActive(false);
    }
  }, [active]);

  return <>{createPopups()}</>;
}
