import { actions } from "../store/page/slice";

export const navigate = (dispatch, navigator, path) => {
  dispatch(actions.hideAllPopups());

  navigator(path);
};
