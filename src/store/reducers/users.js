const initialState = {
  userData: null,
  error: null,
  loading: false,
  open:false,
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

    //MODAL
    case "OPEN_MODAL":
      state.open = true;
      return {...state};
    case "CLOSE_MODAL":
      state.open = false;
      return {...state};
      
    default:
      return { ...state };
  }
};

export default userReducer;
