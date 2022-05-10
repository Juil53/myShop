import { constant } from "../../constants";
const initialState = {
  popup: {
    message: "",
    type: constant.NO_POPUP,
    additionalInfo: {},
  },
};
export function app(state = initialState, action) {
  switch (action.type) {
    case constant.CHANGE_POPUP:
      return {
        ...state,
        popup: {
          message: action.message,
          type: action.popupType,
          additionalInfo: action.additionalInfo,
        },
      };
    default:
      return state;
  }
}
