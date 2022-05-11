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

    submitUserFailed(state,action){
        state.loading = false;
        state.error = action.payload
    },

    getUserInfo(state,action){
        state.userInfo = action.payload;
    }

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
  getUserInfo
} = usersSlice.actions;

export default usersSlice.reducer;
