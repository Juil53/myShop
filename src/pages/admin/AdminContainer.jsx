import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { Routes, useLocation, useNavigate } from "react-router-dom";
import MyDrawer from "../../components/admin/Drawer";
import Popup from "../../components/popup/Popup";
import { renderRouteAdmin } from "../../routes/AdminRoute";
import localStorage from "../../service/localStorage";

const content = {
  flexGrow: 1,
  p: 3,
  mt: 5,
  width: "100%",
  backgroundColor: "#e6eaf3",
  height: "100vh",
};

export default function AdminContainer() {
  const navigator = useNavigate();
  const location = useLocation();
  const token = localStorage.get("admin");

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
