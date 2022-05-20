import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name:"product",
  initialState:{
    options:[],
    loading:false,
    error:null
  },
  reducers:{
    getOptionsRequest(state,action){
      state.loading = true;
    },
    getOptionsSuccess(state,action){
      state.loading = false;
      state.options = action.payload
    },
    getOptionsFailed(state,action){
      state.loading = false;
      state.error = action.payload
    }
  }
})

export const {
  getOptionsRequest,
  getOptionsSuccess,
  getOptionsFailed
} = productSlice.actions;

export default productSlice.reducer;