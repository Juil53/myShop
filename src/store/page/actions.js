import { call, put, takeEvery } from "redux-saga/effects";

import API from "../../service";
import { actions } from "./slice";
import { PAGE_ACTIONS } from "../../constants";

export function* fetchBanners() {
  yield put(actions.fetchBannersRequest());

  try {
    let result = yield call(API.get, { path: "banners" });
    if (!result) {
      throw { msg: "Fail to load banner" };
    }
    yield put(actions.fetchBannersSuccess(result));
  } catch (e) {
    yield put(actions.fetchBannersFail());
  }
}

export default function* root() {
  yield takeEvery(PAGE_ACTIONS.GET_BANNERS, fetchBanners);
}
