import { combineReducers } from "redux";
import { app } from "./app";
import { product } from "./products";
import { language } from "./language";
import { category } from "./category";
const rootReducer = combineReducers({
  app,
  product,
  language,
  category,
});
export default rootReducer;
