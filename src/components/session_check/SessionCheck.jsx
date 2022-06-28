import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {} from "../../store/users/actions";
import { isTokenValid, getTokenRemainTime, getToken } from "../../utils/auth";
import { actions } from "../../store/page/slice";
import { POPUP } from "../../constants";

const SessionCheck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getToken();

    if (token) {
      const isValid = isTokenValid();
      if (!isValid) {
        localStorage.removeItem("user");
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
        const remain = getTokenRemainTime();
        setTimeout(() => {
          localStorage.removeItem("user");
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
