import { constant } from "../../constants";

function changeLanguage(language) {
  return (dispatch) => {
    dispatch({ type: constant.CHANGE_LANGUAGE, language });
  };
}
export const languageActions = {
  changeLanguage,
};
