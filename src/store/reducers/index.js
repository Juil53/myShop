import { combineReducers } from "redux";
import { app } from "./app";
import { product } from "./products";
const rootReducer = combineReducers({
  app,
  product,
});
export default rootReducer;
