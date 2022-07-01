import { createSlice } from "@reduxjs/toolkit";
import { LOADING_STATUS } from "../../constants";
import localStorage from "../../service/localStorage";

const initialState = {
  status: LOADING_STATUS.IDLE,
  msg: "",
  data: {
    status: LOADING_STATUS.IDLE,
    info: {},
  },
  updateStatus: LOADING_STATUS.IDLE,
  updateMsg: "",
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
      state.token = action.payload.token;
      localStorage.set("token", action.payload.token);
      state.status = LOADING_STATUS.SUCCESS;
      state.msg = "Success";
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

        default:
          state.msg = "Something went wrong. Please try again";
          break;
      }
    },

    signout: (state) => {
      state.data.status = LOADING_STATUS.IDLE;
      state.data.info = {};
      state.msg = "";

      localStorage.remove("token");

      state.status = LOADING_STATUS.IDLE;
    },

    signupRequest: (state) => {
      state.status = LOADING_STATUS.LOADING;
    },

    signupSuccess: (state, action) => {
      state.status = LOADING_STATUS.SUCCESS;

      localStorage.set("token", action.payload.token);
      state.msg = "Success";
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
    },

    updateSuccess: (state, action) => {
      state.updateStatus = LOADING_STATUS.SUCCESS;

      if (action.payload) {
        state.data.info = action.payload;
      }

      //localStorage.set("user", action.payload);
    },

    updateFail: (state, action) => {
      state.updateStatus = LOADING_STATUS.FAIL;

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
  },
});

export const clientActions = { ...clientSlice.actions };

export default clientSlice.reducer;
