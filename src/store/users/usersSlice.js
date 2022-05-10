import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    userData: null,
    userDataPagination: null,
    userInfo: null,
    error: null,
    loading: false,
    open: false,
    keyword: null,
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
  },
});

export const {
  getUserRequest,
  getUserSuccess,
  getUserFailed,
  getUserPaginationRequest,
  getUserPaginationSuccess,
  getUserPaginationFailed,
} = usersSlice.actions;

export default usersSlice.reducer;
