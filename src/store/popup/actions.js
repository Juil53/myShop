import { constant } from "../../constants";
function changePopup(popupType, additionalInfo, message) {
  return (dispatch) => {
    dispatch({
      popupType,
      message,
      type: constant.CHANGE_POPUP,
      additionalInfo,
    });
  };
}
export const popupActions = {
  changePopup,
};
