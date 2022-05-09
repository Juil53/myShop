import { constant } from "../../constants";
function changePopup(popupType, additionalInfo, message) {
  console.log(popupType);
  return (dispatch) => {
    dispatch({
      popupType,
      message,
      type: constant.CHANGE_POPUP,
      additionalInfo,
    });
  };
}
export const appActions = {
  changePopup,
};
