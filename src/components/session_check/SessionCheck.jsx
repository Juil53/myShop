import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { isTokenValid, getTokenRemainTime, getToken } from "../../utils/decode";
import { actions } from "../../store/page/slice";
import { POPUP, USER_ACTIONS } from "../../constants";
import { clientData } from "../../store/clients/selector";

const SessionCheck = () => {
  const dispatch = useDispatch();
  const client = useSelector(clientData);
  const [isLoggedIn, setIsLoggedIn] = useState(client.isLoggedIn);

  useEffect(() => {
    console.log(isLoggedIn, client.isLoggedIn, client);
    if (isLoggedIn && !client.isLoggedIn) {
      // show popup
      dispatch(
        actions.activePopup({
          type: POPUP.SELECTION_POPUP,
          data: {
            actionType: "sign in",
            message: "Your session has expried. Do you want to sign in again?",
            title: "Information",
          },
        })
      );
    }

    setIsLoggedIn(client.isLoggedIn);
    console.log(isLoggedIn, client.isLoggedIn);
  }, [client.isLoggedIn]);

  useEffect(() => {
    const token = getToken("token");

    if (token) {
      const isValid = isTokenValid("token");

      if (!isValid) {
        dispatch({ type: USER_ACTIONS.GET_REFRESH_TOKEN });
      } else {
        const remain = getTokenRemainTime("token");

        setTimeout(() => {
          console.log("ahihi");
          dispatch({ type: USER_ACTIONS.GET_REFRESH_TOKEN });
          // dispatch(
          //   actions.activePopup({
          //     type: POPUP.SELECTION_POPUP,
          //     data: {
          //       actionType: "sign in",
          //       message:
          //         "Your session has expried. Do you want to sign in again?",
          //       title: "Information",
          //     },
          //   })
          // );
        }, remain);
      }
    }
  }, []);

  return <></>;
};

export default SessionCheck;
