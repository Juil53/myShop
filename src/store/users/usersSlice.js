import { createSlice } from "@reduxjs/toolkit";
import { LOADING_STATUS } from "../../constants";
import localStorage from "../../service/localStorage";

const usersSlice = createSlice({
  name: "users",

  initialState: {
    userData: [],
    userDataPagination: [],
    userInfo: {},
    status: false,
    error: "",
    loading: false,
    open: false,
    keyword: null,
    loginAdmin: {
      status: LOADING_STATUS.IDLE,
      data: {},
      msg: "",
    },
  },

  reducers: {
    getUsersRequest(state, action) {
      state.loading = true;
    },

    getUsersSuccess(state, action) {
      state.loading = false;
      state.userData = action.payload;
    },

    getUsersFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getUserRequest(state, action) {
      state.loading = true;
    },

    getUserSuccess(state, action) {
      state.loading = false;
      state.userInfo = action.payload;
    },

    getUserFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getUserPaginationRequest(state, action) {
      state.loading = true;
    },

    getUserPaginationSuccess(state, action) {
      state.loading = false;
      state.userDataPagination = action.payload;
    },

    getUserPaginationFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    submitUserRequest(state, action) {
      state.loading = true;
    },

    submitUserSuccess(state, action) {
      state.loading = false;

      const userList = [...state.userData];
      if (action.payload.email) {
        const index = userList.findIndex(
          (user) => user.email === action.payload.email
        );
        if (index !== -1) {
          //Edit
          userList[index] = action.payload;
        } else {
          //Add
          userList.push(action.payload);
        }
      }

      state.userData = userList;
    },

    submitUserFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getUserInfo(state, action) {
      state.userInfo = action.payload;
    },

    updateUserInfoRequest(state, action) {
      state.loading = true;
    },

    deleteUserRequest(state) {
      state.status = false;
    },

    deleteUserSuccess(state, action) {
      state.status = true;
    },

    deleteUserFailed(state, action) {
      state.status = false;
    },

    resetStatus(state) {
      state.status = false;
    },

    openModal(state, action) {
      state.open = true;
    },

    closeModal(state, action) {
      state.open = false;
    },

    getKeyword(state, action) {
      state.keyword = action.payload;
    },

    signinAdminRequest: (state) => {
      state.loginAdmin.status = LOADING_STATUS.LOADING;
    },

    signinAdminSuccess: (state, action) => {
      state.loginAdmin.status = LOADING_STATUS.SUCCESS;
      state.loginAdmin.data = action.payload.info;

      localStorage.set("admin", action.payload.token);
      state.loginAdmin.msg = "";
    },

    signinAdminFail: (state, action) => {
      state.loginAdmin.status = LOADING_STATUS.FAIL;

      switch (action.payload) {
        case "auth/invalid-email":
        case "auth/wrong-password":
          state.loginAdmin.msg = "Invalid email or password";
          break;

        case "auth/network-request-failed":
          state.loginAdmin.msg = "Connection error. Please try again";
          break;

        default:
          state.loginAdmin.msg = "Something went wrong. Please try again";
          break;
      }
    },

    getLoginUserInfo: (state, action) => {
      state.data = action.payload;
    },

    signoutAdmin: (state) => {
      state.loginAdmin.data = null;
      state.loginAdmin.msg = "";
      localStorage.remove("admin");
      state.loginAdmin.status = LOADING_STATUS.IDLE;
    },
  },
});

export const {
  getUsersRequest,
  getUsersSuccess,
  getUsersFailed,
  getUserRequest,
  getUserSuccess,
  getUserFailed,
  getUserPaginationRequest,
  getUserPaginationSuccess,
  getUserPaginationFailed,
  submitUserRequest,
  submitUserSuccess,
  submitUserFailed,
  getUserInfo,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailed,
  updateUserInfoRequest,
  openModal,
  closeModal,
  getKeyword,
  getLoginUserInfo,
  signoutAdmin,
  signinAdminFail,
  signinAdminSuccess,
  signinAdminRequest,
  resetStatus,
} = usersSlice.actions;

export default usersSlice.reducer;
