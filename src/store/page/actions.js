import { call, put, takeEvery } from "redux-saga/effects";

import APIv2 from "../../service/db";
import { actions } from "./slice";
import { PAGE_ACTIONS } from "../../constants";

export function* fetchBanners() {
  yield put(actions.fetchBannersRequest());

  try {
    const result = yield call(APIv2.getAll, "banners");

    if (!result || result.length <= 0) {
      yield put(actions.fetchBannersFail());
    }
    yield put(actions.fetchBannersSuccess(result));
  } catch (e) {
    yield put(actions.fetchBannersFail());
  }
}

export default function* root() {
  yield takeEvery(PAGE_ACTIONS.GET_BANNERS, fetchBanners);
}
