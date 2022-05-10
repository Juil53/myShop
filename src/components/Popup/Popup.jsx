import { appActions } from "../../store/actions/PopupActions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { constant } from "../../constants";
import ProductInfoPopup from "./child/ProductInfoPopup";
import { useEffect } from "react";
export default function Popup(props) {
  const popup = useSelector((store) => store.app.popup);
  const dispatch = useDispatch();
  function handleClosePopup() {
    dispatch(appActions.changePopup(constant.NO_POPUP));
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
  const popups = {
    [constant.NO_POPUP]: <div></div>,
    [constant.PRODUCT_INFO_POPUP]: (
      <ProductInfoPopup closePopup={handleClosePopup} />
    ),
  };
  return popups[popup.type];
}
