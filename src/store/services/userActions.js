import axios from "axios";

//GET_USER_DATA
export const actGetUser = () => {
  return (dispatch) => {
    dispatch(actGetUserRequest());
    axios
      .get("http://localhost:3000/user")
      .then((result) => {
        dispatch(actGetUserSuccess(result.data));
      })
      .catch((error) => {
        dispatch(actGetUserFailed(error));
      });
  };
};

const actGetUserRequest = () => ({
  type: "GET_USER_DATA"
});
const actGetUserSuccess = (data) => ({
  type: "GET_USER_SUCCESS",
  payload: data,
});
const actGetUserFailed = (error) => ({
  type: "GET_USER_FAILED",
  payload: error,
});


