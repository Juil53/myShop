import { call, put, takeEvery } from "redux-saga/effects";

import { actions } from "./slice";
import API from "../../service";
import { CATEGORY_ACTIONS } from "../../constants";

// export const fetchCategories = createAsyncThunk(
//   "fetchCategories",
//   async (_, { rejectWithValue }) => {
//     const data = await API.get({ path: "category" });
//     if (data) return data;
//     return rejectWithValue();
//   }
// );

export function* fetchCategories() {
  yield put(actions.fetchCategoriesRequest());

  try {
    let result = yield call(API.get, { path: "categories" });
    if (!result) {
      throw { msg: "Get categories fail" };
    }
    yield put(actions.fetchCategoriesSuccess(result));
  } catch (e) {
    console.log(e);
    yield put(actions.fetchCategoriesFail());
  }
}

export default function* root() {
  yield takeEvery(CATEGORY_ACTIONS.GET_ALL_CATEGORIES, fetchCategories);
}
