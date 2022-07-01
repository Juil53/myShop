import { createSlice } from "@reduxjs/toolkit";
import { LOADING_STATUS } from "../../constants";
import localStorage from "../../service/localStorage";

const initialState = {
  status: LOADING_STATUS.IDLE,
  msg: "",
  data: localStorage.get("user"),
  token: localStorage.get("token"),
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
      state.data = action.payload.client;
      state.token = action.payload.token;

      localStorage.set("user", action.payload.client);
      localStorage.set("token", action.payload.token);

      state.status = LOADING_STATUS.SUCCESS;
      state.msg = "Success";
    },

    signinFail: (state) => {
      state.data = null;
      state.token = null;
      state.status = LOADING_STATUS.FAIL;
      state.msg = "Wrong username or password";
    },

    signout: (state) => {
      state.data = null;
      state.token = null;
      state.msg = "";

      localStorage.remove("user");
      localStorage.remove("token");

      state.status = LOADING_STATUS.IDLE;
    },

    signupRequest: (state) => {
      state.status = LOADING_STATUS.LOADING;
    },

    signupSuccess: (state, action) => {
      state.status = LOADING_STATUS.SUCCESS;
      state.data = action.payload;
      localStorage.set("user", action.payload.user);
      localStorage.set("token", action.payload.token);
      state.msg = "Success";
    },

    signupFail: (state, action) => {
      state.status = LOADING_STATUS.FAIL;
      if (action.payload === "auth/email-already-in-use")
        state.msg = "Email already in use";
    },

    getUserInfo: (state, action) => {
      state.status = LOADING_STATUS.SUCCESS;
      state.data = action.payload;
    },

    updateRequest: (state) => {
      state.updateStatus = LOADING_STATUS.LOADING;
    },

    updateSuccess: (state, action) => {
      state.updateStatus = LOADING_STATUS.SUCCESS;

      if (action.payload) {
        state.data = action.payload;
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
