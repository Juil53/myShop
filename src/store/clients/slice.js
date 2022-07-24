import { createSlice } from "@reduxjs/toolkit";
import { LOADING_STATUS } from "../../constants";
import localStorage from "../../service/localStorage";

const initialState = {
  data: {
    status: LOADING_STATUS.IDLE,
    isLoggedIn: !!localStorage.get("token"),
    info: {},
  },
  updateStatus: LOADING_STATUS.IDLE,
  updateMsg: "",
  customers: [],
  error: null,
  loading: false,
};

const clientSlice = createSlice({
  name: "clients",

  initialState,

  reducers: {
    signinRequest: (state) => {
      state.msg = "Loading";
      state.status = LOADING_STATUS.LOADING;
    },

    signinSuccess: (state, action) => {
      localStorage.set("token", action.payload.token);
      localStorage.set("providerID", action.payload?.providerID);
      localStorage.set("refreshToken", action.payload.refreshToken);

      state.status = LOADING_STATUS.SUCCESS;
      state.data.isLoggedIn = true;
      state.msg = "Success";
      console.log("signin success", state);
    },

    signinFail: (state, action) => {
      state.data.info = {};
      state.status = LOADING_STATUS.FAIL;

      switch (action.payload) {
        case "auth/invalid-email":
        case "auth/wrong-password":
          state.msg = "Invalid email or password";
          break;

        case "auth/network-request-failed":
          state.msg = "Connection error. Please try again";
          break;

        case "auth/popup-closed-by-user":
          state.msg = "";
          break;

        case "User not found":
        case "auth/user-not-found":
          state.msg = "User not found";
          break;

        default:
          state.msg = "Something went wrong. Please try again";
          break;
      }
    },

    getRefreshTokenSuccess: (_, action) => {
      localStorage.set("token", action.payload.token);
      localStorage.set("refreshToken", action.payload.refreshToken);
    },

    signout: (state) => {
      state.data.status = LOADING_STATUS.IDLE;
      state.data.isLoggedIn = false;
      state.data.info = {};
      state.msg = "";

      localStorage.remove("token");
      localStorage.remove("providerID");
      localStorage.remove("refreshToken");

      state.status = LOADING_STATUS.IDLE;
    },

    signupRequest: (state) => {
      state.status = LOADING_STATUS.LOADING;
    },

    signupSuccess: (state, action) => {
      state.status = LOADING_STATUS.SUCCESS;

      localStorage.set("token", action.payload.token);
      localStorage.set("refreshToken", action.payload.refreshToken);
      localStorage.set("providerID", action.payload?.providerID);
      state.msg = "Success";
      state.data.isLoggedIn = true;
    },

    signupFail: (state, action) => {
      state.status = LOADING_STATUS.FAIL;
      if (action.payload === "auth/email-already-in-use")
        state.msg = "Email already in use";
    },

    getUserInfo: (state, action) => {
      state.data.status = LOADING_STATUS.SUCCESS;
      state.data.info = action.payload;
    },

    updateRequest: (state) => {
      state.updateStatus = LOADING_STATUS.LOADING;
      state.data.status = LOADING_STATUS.UPDATING;
    },

    updateSuccess: (state, action) => {
      state.updateStatus = LOADING_STATUS.SUCCESS;
      state.data.status = LOADING_STATUS.SUCCESS;

      if (action.payload) {
        state.data.info = action.payload;
      }
    },

    updateFail: (state, action) => {
      state.updateStatus = LOADING_STATUS.FAIL;
      state.data.status = LOADING_STATUS.SUCCESS;

      switch (action.payload) {
        case "auth/wrong-password":
          state.updateMsg = "Wrong password. Please try again";
          break;

        case "auth/network-request-failed":
          state.updateMsg = "Connection error. Please try again";
          break;

        default:
          state.updateMsg = "Something went wrong. Please try again";
          break;
      }
    },

    updatePasswordRequest: (state) => {
      state.updateStatus = LOADING_STATUS.LOADING;
      state.data.status = LOADING_STATUS.UPDATING;
    },

    updatePasswordSuccess: (state) => {
      state.updateStatus = LOADING_STATUS.SUCCESS;
      state.data.status = LOADING_STATUS.SUCCESS;
    },

    updatePasswordFail: (state, action) => {
      state.updateStatus = LOADING_STATUS.FAIL;
      state.data.status = LOADING_STATUS.SUCCESS;

      switch (action.payload) {
        case "auth/wrong-password":
          state.updateMsg = "Wrong password. Please try again";
          break;

        case "auth/network-request-failed":
          state.updateMsg = "Connection error. Please try again";
          break;

        default:
          state.updateMsg = "Something went wrong. Please try again";
          break;
      }
    },

    getCustomersRequest(state) {
      state.loading = true;
    },

    getCustomersSuccess(state, action) {
      state.loading = false;
      state.customers = action.payload;
    },

    getCustomersFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const clientActions = { ...clientSlice.actions };

export default clientSlice.reducer;
