import { createAsyncThunk } from "@reduxjs/toolkit";

import { categoryService } from "../categories/services";

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
