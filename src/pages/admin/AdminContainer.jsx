import React, { useEffect } from "react";
import { Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Box } from "@mui/material";
import MyDrawer from "./admin_page/component/Drawer";

import Signin from "./signin_admin/Signin";
import { loginAdmin } from "../../store/users/selector";
import { renderRouteAdmin } from "../../routes/AdminRoute";
import { LOADING_STATUS, POPUP } from "../../constants";
import Popup from "../../components/popup/Popup";
import { actions } from "../../store/page/slice";

const content = {
  flexGrow: 1,
  p: 3,
  mt: 8,
  width: "100%",
  backgroundColor: "#f6f7f9",
  height: "100vh",
};

export default function AdminContainer() {
  const loginData = useSelector(loginAdmin);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginData.status === LOADING_STATUS.SUCCESS) {
      dispatch(actions.hidePopup(POPUP.WAITING_POPUP));
    }
  });

  return (
    <>
      {loginData.status !== LOADING_STATUS.SUCCESS ? (
        <Signin />
      ) : (
        <Box sx={{ display: "flex" }}>
          <MyDrawer className="sidebar" />
          <Box className="content" component="main" sx={content}>
            <Routes>{renderRouteAdmin()}</Routes>
          </Box>
        </Box>
      )}
      <Popup />
    </>
  );
}
