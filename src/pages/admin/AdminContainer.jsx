import React from "react";
import { Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import { Box } from "@mui/material";
import MyDrawer from "./admin_page/component/Drawer";

import Signin from "./signin_admin/Signin";
import { loginAdmin } from "../../store/users/selector";
import { renderRouteAdmin } from "../../routes/AdminRoute";

const content = {
  flexGrow: 1,
  p: 3,
  mt: 8,
  width: "100%",
  backgroundColor: "#f6f7f9",
  height:'100vh'
};

export default function AdminContainer(props) {
  const loginData = useSelector(loginAdmin);
  return (
    <>
      {!loginData.data ? (
        <Signin />
      ) : (
        <Box sx={{ display: "flex" }}>
          <MyDrawer className="sidebar"/>
          <Box className="content" component="main" sx={content}>
            <Routes>{renderRouteAdmin()}</Routes>
          </Box>
        </Box>
      )}
    </>
  );
}
