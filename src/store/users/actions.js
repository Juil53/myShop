import axios from "axios";
import {
  getUserRequest,
  getUserSuccess,
  getUserFailed,
  getUserPaginationRequest,
  getUserPaginationSuccess,
  getUserPaginationFailed,
  submitUserRequest,
  submitUserSuccess,
  submitUserFailed,
} from "./usersSlice";

//GET USER DATA == thunk => Saga
export const actGetUser = () => {
  return (dispatch) => {
    dispatch(getUserRequest());
    axios
      .get("http://localhost:3000/user")
      .then((result) => {
        dispatch(getUserSuccess(result.data));
      })
      .catch((error) => {
        dispatch(getUserFailed(error));
      });
  };
};

// GET USER DATA PAGINATION
export const actGetUserPagination = (page, limit) => {
  return (dispatch) => {
    dispatch(getUserPaginationRequest());
    axios
      .get(`http://localhost:3000/user?_page=${page}&_limit=${limit}`)
      .then((result) => {
        dispatch(getUserPaginationSuccess(result.data));
      })
      .catch((error) => {
        dispatch(getUserPaginationFailed(error));
      });
  };
};

// ADD USER
export const actAddUser = (user) => {
  return (dispatch) => {
    dispatch(submitUserRequest());
    axios
      .post("http://localhost:3000/user", user)
      .then((result) => {
        dispatch(submitUserSuccess(result.data));
        actGetUserPagination();
      })
      .catch((error) => {
        console.log(error);
        dispatch(submitUserFailed(error));
      });
  };
};


// DELETE USER
export const actDeleteUser = (userId) => {
  return (dispatch) => {
    axios
      .delete(`http://localhost:3000/user/${userId}`)
      .then((result) => {
        alert("Delete Success");
        dispatch(actGetUserPagination());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// UPDATE USER
export const actUpdateUserInfo = (user, userId) => {
  return (dispatch) => {
    dispatch(submitUserRequest());
    axios
      .put(`http://localhost:3000/user/${userId}`, user)
      .then((result) => {
        dispatch(submitUserSuccess(result.data));
        dispatch(actGetUserPagination());
      })
      .catch((error) => {
        dispatch(submitUserFailed(error));
      });
  };
};

// SEARCH
export const actGetKeyword = (keyword) => {
  return {
    type: "GET_KEYWORD",
    payload: keyword,
  };
};
