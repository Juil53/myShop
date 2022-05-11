import { createAsyncThunk } from "@reduxjs/toolkit";

import { constant } from "../../constants";
import { categoryService } from "../categories/services";

function getAllCategory() {
  return (dispatch) => {
    categoryService.getAllCategory().then((res) => {
      dispatch(success(res));
    });
  };
  function success(data) {
    return { type: constant.GET_CATEGORY, data };
  }
}

export const fetchCategories = createAsyncThunk(
  "categories/getCategories",
  async () => {
    try {
      const data = await categoryService.getAllCategory();
      return data;
    } catch (err) {
      console.log(err);
      return { msg: err.msg };
    }
  }
);

export const categoryAction = {
  getAllCategory,
};
