import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { isTokenValid, getTokenRemainTime, getToken } from "../../utils/decode";
import { actions } from "../../store/page/slice";
import { POPUP, USER_ACTIONS } from "../../constants";

const SessionCheck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getToken();

    if (token) {
      const isValid = isTokenValid("token");
      if (!isValid) {
        dispatch({ type: USER_ACTIONS.SIGNOUT_USER });
        dispatch(
          actions.activePopup({
            type: POPUP.SELECTION_POPUP,
            data: {
              actionType: "sign in",
              message:
                "Your session has expried. Do you want to sign in again?",
              title: "Information",
            },
          })
        );
      } else {
        const remain = getTokenRemainTime("token");
        setTimeout(() => {
          dispatch({ type: USER_ACTIONS.SIGNOUT_USER });
          dispatch(
            actions.activePopup({
              type: POPUP.SELECTION_POPUP,
              data: {
                actionType: "sign in",
                message:
                  "Your session has expried. Do you want to sign in again?",
                title: "Information",
              },
            })
          );
        }, remain);
      }
    }
  }, []);

  return <></>;
};

export default SessionCheck;
