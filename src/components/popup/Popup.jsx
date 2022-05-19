import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { pageSelector } from "../../store/page/selector";
import { actions } from "../../store/page/slice";
import { POPUP } from "../../constants";

import ProductInfoPopup from "./child/ProductInfoPopup";
import Login from "./child/Login";

export default function Popup(props) {
  const { popup } = useSelector(pageSelector);
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
    return popup.active.map((v) => {
      return createPopup(v.type, v.data);
    });
  };

  function handleClosePopup(type) {
    dispatch(actions.hidePopup(type));
  }

  useEffect(() => {
    console.log(popup.active.length);
    const page = document.getElementById("page");
    if (popup.active.length) {
      page.classList.add("haspopup");
    } else {
      page.classList.remove("haspopup");
    }
  }, [popup.active]);

  return <>{createPopups()}</>;
}
