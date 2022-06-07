import React from "react";
import MyDrawer from "./admin_page/component/Drawer";
import { Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { renderRouteAdmin } from "../../routes/AdminRoute";

const content = {
  flexGrow: 1,
  p: 3,
  mt: 8,
  width:'100%'
};

export default function AdminContainer(props) {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <MyDrawer className="sidebar" />
        <Box className="content" component="main" sx={content}>
          <Routes>{renderRouteAdmin()}</Routes>
        </Box>
      </Box>
    </>
  );
}
