import { combineReducers } from "redux";
// import { product } from "./products";
import userReducer from "./users";
const rootReducer = combineReducers({
  // product,
  userReducer,
});
export default rootReducer;
