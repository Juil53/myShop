import React, { useEffect, useState } from "react";
import { Routes, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Box } from "@mui/material";
import MyDrawer from "../../components/admin/Drawer";
import { useLocation } from "react-router-dom";

import Signin from "./signin_admin/Signin";
import { loginAdmin } from "../../store/users/selector";
import { renderRouteAdmin } from "../../routes/AdminRoute";
import { LOADING_STATUS, POPUP } from "../../constants";
import Popup from "../../components/popup/Popup";
import { actions } from "../../store/page/slice";
import localStorage from "../../service/localStorage";

const content = {
  flexGrow: 1,
  p: 3,
  mt: 8,
  width: "100%",
  backgroundColor: "#f6f7f9",
  height: "100vh",
};

export default function AdminContainer() {
  const navigator = useNavigate();
  const token = localStorage.get("admin");

  const location = useLocation();

  useEffect(() => {
    if (!token) {
      navigator(`/admin/login?backPage=${location.pathname}`);
    }
  }, [token]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        {!!token && <MyDrawer className="sidebar" />}
        <Box className="content" component="main" sx={content}>
          <Routes>{renderRouteAdmin(token)}</Routes>
        </Box>
      </Box>
      <Popup />
    </>
  );
}
