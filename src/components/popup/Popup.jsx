import { actions } from "../../store/page/slice";
import { useDispatch, useSelector } from "react-redux";
import { POPUP } from "../../constants";
import ProductInfoPopup from "./child/ProductInfoPopup";
import { useEffect } from "react";
import { pageSelector } from "../../store/page/selector";

export default function Popup(props) {
  const { popup } = useSelector(pageSelector);
  const dispatch = useDispatch();
  //Define popups
  const popups = {
    [POPUP.NO_POPUP]: <div></div>,
    [POPUP.PRODUCT_INFO_POPUP]: (
      <ProductInfoPopup closePopup={handleClosePopup} />
    ),
  };

  function handleClosePopup() {
    dispatch(actions.changePopup({ type: POPUP.NO_POPUP }));
  }

  useEffect(() => {
    const page = document.getElementById("page");
    if (popup.type === POPUP.NO_POPUP) {
      if (page.classList.contains("haspopup")) {
        page.classList.remove("haspopup");
      }
    } else {
      if (!page.classList.contains("haspopup")) {
        page.classList.add("haspopup");
      }
    }
  }, [popup.type]);

  return popups[popup.type];
}
