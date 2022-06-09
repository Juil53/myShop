import { createSlice } from "@reduxjs/toolkit";

import { LOADING_STATUS } from "../../constants";

const initialState = {
  userData: [],
  status: LOADING_STATUS.IDLE,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    findUserByEmail: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const actions = { ...userSlice.actions };

export default userSlice.reducer;
