import { appActions } from "../../store/actions/appActions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { constant } from "../../constants";
import ProductInfoPopup from "./child/ProductInfoPopup";
export default function Popup(props) {
  const popup = useSelector((store) => store.app.popup);
  const dispatch = useDispatch();
  function handleClosePopup() {
    dispatch(appActions.changePopup(constant.NO_POPUP));
  }
  const popups = {
    [constant.NO_POPUP]: <div></div>,
    [constant.PRODUCT_INFO_POPUP]: (
      <ProductInfoPopup closePopup={handleClosePopup} />
    ),
  };
  return popups[popup.type];
}
