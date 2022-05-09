import axios from "axios";

//GET USER DATA
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
  type: "GET_USER_DATA",
});
const actGetUserSuccess = (data) => ({
  type: "GET_USER_SUCCESS",
  payload: data,
});
const actGetUserFailed = (error) => ({
  type: "GET_USER_FAILED",
  payload: error,
});

// GET USER DATA PAGINATION
export const actGetUserPagination = (page, limit) => {
  return (dispatch) => {
    dispatch(actGetUserPaginationRequest());
    axios
      .get(`http://localhost:3000/user?_page=${page}&_limit=${limit}`)
      .then((result) => {
        dispatch(actGetUserPaginationSuccess(result.data));
      })
      .catch((error) => {
        dispatch(actGetUserPaginationFailed(error));
      });
  };
};
const actGetUserPaginationRequest = () => ({
  type: "GET_USER_PAGINATION_REQUEST",
});
const actGetUserPaginationSuccess = (data) => ({
  type: "GET_USER_PAGINATION_SUCCESS",
  payload: data,
});
const actGetUserPaginationFailed = (error) => ({
  type: "GET_USER_PAGINATION_FAILED",
  payload: error,
});

// ADD USER
export const actAddUser = (user) => {
  return (dispatch) => {
    dispatch(actAddUserRequest());
    axios
      .post("http://localhost:3000/user", user)
      .then((result) => {
        dispatch(actAddUserSuccess(result.data));
        console.log(result.data);
        actGetUser();
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
        dispatch(actGetUser());
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
        dispatch(actGetUser());
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
