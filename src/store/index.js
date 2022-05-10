import { combineReducers } from "redux";
import { popup } from "./popup/reducer";
import { products } from "./products/reducer";
import { languages } from "./languages/reducer";
import { categories } from "./categories/reducer";
import userReducer from "./users/reducer";

const rootReducer = combineReducers({
  popup,
  products,
  languages,
  categories,
  userReducer,
});
export default rootReducer;
