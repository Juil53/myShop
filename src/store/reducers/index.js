import { combineReducers } from "redux";
import { app } from "./Popup";
import { product } from "./Products";
import { language } from "./Language";
import { category } from "./Category";
import userReducer from "./Users";
const rootReducer = combineReducers({
  app,
  product,
  language,
  category,
  userReducer,
});
export default rootReducer;
