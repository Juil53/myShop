import { createSlice } from "@reduxjs/toolkit";

import { LOADING_STATUS } from "../../constants";
import localStorage from "../../service/localStorage";

const initialState = {
  status: LOADING_STATUS.IDLE,
  data: {},
  msg: "",
};

const userSlice = createSlice({
  name: "userLogin",
  initialState,

  reducers: {
    loginRequest: (state) => {
      state.msg = "Loading";
      state.status = LOADING_STATUS.LOADING;
    },

    loginSuccess: (state, action) => {
      state.data = action.payload;
      localStorage.set("user", action.payload);
      state.status = LOADING_STATUS.SUCCESS;
      state.msg = "Success";
    },

    loginFail: (state) => {
      state.data = {};
      state.status = LOADING_STATUS.FAIL;
      state.msg = "Wrong username or password";
    },

    getUserInfo: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const actions = { ...userSlice.actions };

export default userSlice.reducer;
