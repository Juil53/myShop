import apiInstance from "../../utils/axios/axiosInstance";
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
  return async (dispatch) => {
    try {
      dispatch(getUserRequest());
      const result = await apiInstance.get("user");
      dispatch(getUserSuccess(result));
    } catch (error) {
      dispatch(getUserFailed(error));
    }
  };
};

// GET USER DATA PAGINATION
export const actGetUserPagination = (page, limit) => {
  return async (dispatch) => {
    try {
      dispatch(getUserPaginationRequest());
      const result = await apiInstance.get(
        `user?_page=${page}&_limit=${limit}`
      );
      dispatch(getUserPaginationSuccess(result));
    } catch (error) {
      dispatch(getUserPaginationFailed(error));
    }
  };
};

// ADD USER
export const actAddUser = (user) => {
  return async (dispatch) => {
    try {
      dispatch(submitUserRequest());
      const result = await apiInstance.post("user", user);
      dispatch(submitUserSuccess(result));
      actGetUserPagination();
    } catch (error) {
      dispatch(submitUserFailed(error));
    }
  };
};

// DELETE USER
export const actDeleteUser = (userId) => {
  return async (dispatch) => {
    try {
      apiInstance.delete(`user/${userId}`);
      alert("Delete Success");
      dispatch(actGetUserPagination());
    } catch (error) {
      console.log(error);
    }
  };
};

// UPDATE USER
export const actUpdateUserInfo = (user, userId) => {
  return async (dispatch) => {
    try {
      dispatch(submitUserRequest());
      const result = await apiInstance.put(`user/${userId}`, user);
      dispatch(submitUserSuccess(result));
      dispatch(actGetUserPagination());
    } catch (error) {
      dispatch(submitUserFailed(error));
    }
  };
};
