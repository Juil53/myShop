import { createSlice } from "@reduxjs/toolkit";
import { LOADING_STATUS } from "../../constants";
import localStorage from "../../service/localStorage";

const initialState = {
  status: LOADING_STATUS.IDLE,
  msg: "",
  data: localStorage.get("user"),
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
      state.data = action.payload;
      localStorage.set("user", action.payload);
      state.status = LOADING_STATUS.SUCCESS;
      state.msg = "Success";
    },

    signinFail: (state) => {
      state.data = null;
      state.status = LOADING_STATUS.FAIL;
      state.msg = "Wrong username or password";
    },

    signout: (state) => {
      state.data = null;
      state.msg = "";
      localStorage.remove("user");
      state.status = LOADING_STATUS.IDLE;
    },

    signupRequest: (state) => {
      state.status = LOADING_STATUS.LOADING;
    },

    signupSuccess: (state, action) => {
      state.status = LOADING_STATUS.SUCCESS;
      state.data = action.payload;
      localStorage.set("user", action.payload);
      state.msg = "Success";
    },

    signupFail: (state, action) => {
      state.status = LOADING_STATUS.FAIL;
      if (action.payload === "auth/email-already-in-use")
        state.msg = "Email already in use";
    },
  },
});

export const clientActions = { ...clientSlice.actions };

export default clientSlice.reducer;
