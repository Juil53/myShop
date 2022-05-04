const initialState = {
  userData: null,
  userInfo: null,
  error: null,
  loading: false,
  open: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    //GET ALL USER
    case "GET_USER_DATA":
      state.loading = true;
      state.userData = null;
      state.error = null;
      return { ...state };
    case "GET_USER_SUCCESS":
      state.loading = false;
      state.userData = action.payload;
      state.error = null;
      return { ...state };
    case "GET_USER_FAILED":
      state.loading = false;
      state.userData = null;
      state.error = action.payload;
      return { ...state };

    //SUBMIT USER
    case "SUBMIT_USER_REQUEST":
      state.loading = true;
      state.error = null;
      return { ...state };
    case "SUBMIT_USER_SUCCESS":
      state.loading = false;

      const userList = [...state.userData];

      if (action.payload.email) {
        const index = userList.findIndex(
          (user) => (user.email === action.payload.email)
        );
        if (index !== -1) {
          userList[index] = action.payload;
        } else {
          userList.push(action.payload);
        }
      }

      state.userData = userList;
      state.error = null;
      return { ...state };
    case "SUBMIT_USER_FAILED":
      state.loading = false;
      state.userData = null;
      state.error = action.payload;
      return { ...state };

    //GET USER INFO
    case "GET_USER_INFO":
      state.userInfo = action.payload;
      return { ...state };

    //MODAL
    case "OPEN_MODAL":
      state.open = true;
      return { ...state };
    case "CLOSE_MODAL":
      state.open = false;
      return { ...state };

    default:
      return { ...state };
  }
};

export default userReducer;
