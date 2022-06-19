import { createSlice } from "@reduxjs/toolkit";
import { LOADING_STATUS } from "../../constants";
import localStorage from "../../service/localStorage";

const usersSlice = createSlice({
  name: "users",

  initialState: {
    userData: [],
    userDataPagination: [],
    userInfo: {},
    error: "",
    loading: false,
    open: false,
    keyword: null,
    loginUser: {
      status: LOADING_STATUS.IDLE,
      data: localStorage.get("user"),
      msg: "",
    },
    loginAdmin: {
      status: LOADING_STATUS.IDLE,
      data: localStorage.get("admin"),
      msg: "",
    },
  },

  reducers: {
    getUserRequest(state, action) {
      state.loading = true;
    },

    getUserSuccess(state, action) {
      state.loading = false;
      state.userData = action.payload;
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

    updateUserInfo(state, action) {
      state.userInfo = action.payload;
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

    signinRequest: (state) => {
      state.loginUser.msg = "Loading";
      state.loginUser.status = LOADING_STATUS.LOADING;
    },

    signinSuccess: (state, action) => {
      state.loginUser.data = action.payload;
      localStorage.set("user", action.payload);
      state.loginUser.status = LOADING_STATUS.SUCCESS;
      state.loginUser.msg = "Success";
    },

    signinFail: (state) => {
      state.loginUser.data = null;
      state.loginUser.status = LOADING_STATUS.FAIL;
      state.loginUser.msg = "Wrong username or password";
    },

    signinAdminRequest: (state) => {
      state.loginAdmin.status = LOADING_STATUS.LOADING;
    },

    signinAdminSuccess: (state, action) => {
      state.loginAdmin.status = LOADING_STATUS.SUCCESS;
      state.loginAdmin.data = action.payload;
      localStorage.set("admin", action.payload);
      state.loginAdmin.msg = "";
    },

    signinAdminFail: (state) => {
      state.loginAdmin.status = LOADING_STATUS.FAIL;
      state.loginAdmin.msg = "Wrong username or password";
    },

    getLoginUserInfo: (state, action) => {
      state.data = action.payload;
    },

    signout: (state) => {
      state.loginUser.data = null;
      state.loginUser.msg = "";
      localStorage.remove("user");
      state.loginUser.status = LOADING_STATUS.IDLE;
    },

    signoutAdmin: (state) => {
      state.loginAdmin.data = null;
      state.loginAdmin.msg = "";
      localStorage.remove("admin");
      state.loginAdmin.status = LOADING_STATUS.IDLE;
    },

    signupRequest: (state) => {
      state.loginUser.status = LOADING_STATUS.LOADING;
    },

    signupSuccess: (state, action) => {
      state.loginUser.status = LOADING_STATUS.SUCCESS;
      state.loginUser.data = action.payload;
      localStorage.set("user", action.payload);
      state.loginUser.msg = "Success";
    },

    signupFail: (state, action) => {
      state.loginUser.status = LOADING_STATUS.FAIL;
      if (action.payload === "auth/email-already-in-use")
        state.loginUser.msg = "Email already in use";
    },
  },
});

export const {
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
  updateUserInfo,
  openModal,
  closeModal,
  getKeyword,
  signinRequest,
  signinSuccess,
  signinFail,
  getLoginUserInfo,
  signout,
  signoutAdmin,
  signupRequest,
  signupSuccess,
  signupFail,
  signinAdminFail,
  signinAdminSuccess,
  signinAdminRequest,
} = usersSlice.actions;

export default usersSlice.reducer;
