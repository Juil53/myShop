import { call, put, takeEvery } from "redux-saga/effects";

import { actions } from "./slice";
import API from "../../service";

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
    let result = yield call(API.get, { path: "category" });
    yield put(actions.fetchCategoriesSuccess(result));
  } catch (e) {
    yield put(actions.fetchCategoriesFail());
  }
}

export default function* root() {
  yield takeEvery("FETCH_CATEGORIES", fetchCategories);
}
