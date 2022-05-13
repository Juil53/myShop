import { createAsyncThunk } from "@reduxjs/toolkit";

import { service } from "./service";

export const fetchHome = createAsyncThunk("page/getHome", async () => {
  try {
    const data = await service.getHomePage();
    return data;
  } catch (err) {
    console.log(err);
  }
});
