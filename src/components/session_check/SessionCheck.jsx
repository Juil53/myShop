import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { isTokenValid, getTokenRemainTime, getToken } from "../../utils/decode";
import { USER_ACTIONS } from "../../constants";
import { clientData } from "../../store/clients/selector";

const SessionCheck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getToken("token");

    if (token) {
      const isValid = isTokenValid("token");

      if (!isValid) {
        dispatch({ type: USER_ACTIONS.GET_REFRESH_TOKEN });
      } else {
        const remain = getTokenRemainTime("token");

        setTimeout(() => {
          dispatch({ type: USER_ACTIONS.GET_REFRESH_TOKEN });
        }, remain);
      }
    }
  }, []);

  return <></>;
};

export default SessionCheck;
