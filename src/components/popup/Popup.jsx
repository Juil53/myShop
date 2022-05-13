import { popupActions } from "../../store/popup/actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { constant } from "../../constants";
import ProductInfoPopup from "./child/ProductInfoPopup";
import { useEffect } from "react";

export default function Popup(props) {
  const popup = useSelector((state) => state.popup.popup);
  const dispatch = useDispatch();
  //Define popups
  const popups = {
    [constant.NO_POPUP]: <div></div>,
    [constant.PRODUCT_INFO_POPUP]: (
      <ProductInfoPopup closePopup={handleClosePopup} />
    ),
  };

  function handleClosePopup() {
    dispatch(popupActions.changePopup(constant.NO_POPUP));
  }

  useEffect(() => {
    const page = document.getElementById("page");
    if (popup.type === constant.NO_POPUP) {
      if (page.classList.contains("haspopup")) {
        page.classList.remove("haspopup");
      }
    } else {
      if (!page.classList.contains("haspopup")) {
        page.classList.add("haspopup");
      }
    }
  });

  return popups[popup.type];
}
