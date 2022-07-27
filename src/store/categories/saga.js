import { call, put, takeEvery } from "redux-saga/effects";

import { actions } from "./slice";
import APIv2 from "../../service/db";
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
  try {
    const result = yield call(APIv2.getAll, "categories");
    if (!result || result.length <= 0) {
      yield put(actions.fetchCategoriesFail());
    } else {
      yield put(actions.fetchCategoriesSuccess(result));
    }
  } catch (e) {
    yield put(actions.fetchCategoriesFail());
  }
}

export function* actGetSelectedCategory(action) {
  yield put(actions.getSelectedCategory(action.payload));
}

export function* actGetSelectedSubCategory(action) {
  yield put(actions.getSelectedSubCategory(action.payload));
}

export default function* root() {
  yield takeEvery("categories/fetchCategoriesRequest", fetchCategories);
  yield takeEvery(
    CATEGORY_ACTIONS.GET_SELECTED_CATEGORY,
    actGetSelectedCategory
  );
  yield takeEvery(
    CATEGORY_ACTIONS.GET_SELECTED_SUB_CATEGORY,
    actGetSelectedSubCategory
  );
}
