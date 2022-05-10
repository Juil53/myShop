import axios from "axios";
import {
  getUserRequest,
  getUserSuccess,
  getUserFailed,
  getUserPaginationRequest,
  getUserPaginationSuccess,
  getUserPaginationFailed,
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

// GET USER DATA == Actions => Slice
// const actGetUserRequest = () => ({
//   type: "GET_USER_DATA",
// });
// const actGetUserSuccess = (data) => ({
//   type: "GET_USER_SUCCESS",
//   payload: data,
// });
// const actGetUserFailed = (error) => ({
//   type: "GET_USER_FAILED",
//   payload: error,
// });

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
// const actGetUserPaginationRequest = () => ({
//   type: "GET_USER_PAGINATION_REQUEST",
// });
// const actGetUserPaginationSuccess = (data) => ({
//   type: "GET_USER_PAGINATION_SUCCESS",
//   payload: data,
// });
// const actGetUserPaginationFailed = (error) => ({
//   type: "GET_USER_PAGINATION_FAILED",
//   payload: error,
// });

// ADD USER
export const actAddUser = (user) => {
  return (dispatch) => {
    dispatch(actAddUserRequest());
    axios
      .post("http://localhost:3000/user", user)
      .then((result) => {
        dispatch(actAddUserSuccess(result.data));
        actGetUserPagination();
      })
      .catch((error) => {
        console.log(error);
        dispatch(actAddUserFailed(error));
      });
  };
};

const actAddUserRequest = () => {
  return {
    type: "SUBMIT_USER_REQUEST",
  };
};
const actAddUserSuccess = (data) => {
  return {
    type: "SUBMIT_USER_SUCCESS",
    payload: data,
  };
};
const actAddUserFailed = (error) => {
  return {
    type: "SUBMIT_USER_FAILED",
    payload: error,
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

// GET USER INFO
export const actGetUserInfo = (user) => {
  return {
    type: "GET_USER_INFO",
    payload: user,
  };
};

// UPDATE USER
export const actUpdateUserInfo = (user, userId) => {
  return (dispatch) => {
    dispatch(actUpdateUserRequest());
    axios
      .put(`http://localhost:3000/user/${userId}`, user)
      .then((result) => {
        dispatch(actUpdateUserSuccess(result.data));
        dispatch(actGetUserPagination());
      })
      .catch((error) => {
        dispatch(actUpdateUserFailed(error));
      });
  };
};
const actUpdateUserRequest = () => {
  return {
    type: "SUBMIT_USER_REQUEST",
  };
};
const actUpdateUserSuccess = (user) => {
  return {
    type: "SUBMIT_USER_SUCCESS",
    payload: user,
  };
};
const actUpdateUserFailed = (error) => {
  return {
    type: "SUBMIT_USER_FAILED",
    payload: error,
  };
};

// SEARCH
export const actGetKeyword = (keyword) => {
  return {
    type: "GET_KEYWORD",
    payload: keyword,
  };
};
