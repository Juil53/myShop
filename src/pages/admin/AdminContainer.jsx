import React from "react";
import MyDrawer from "./admin-page/component/Drawer";
import { Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { renderRouteAdmin } from "../../routes/AdminRoute";


export default function AdminContainer(props) {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <MyDrawer className="sidebar" />
        <Box
          className="content"
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: 2,
          }}
        >
          <Routes>
            {renderRouteAdmin()}
          </Routes>
        </Box>
      </Box>
    </>
  );
}
