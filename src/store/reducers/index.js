import { combineReducers } from "redux";
import { app } from "./app";
import { product } from "./products";
import { language } from "./language";
import { category } from "./category";
import userReducer from "./users";
const rootReducer = combineReducers({
  app,
  product,
  language,
  category,
  userReducer,
});
export default rootReducer;
