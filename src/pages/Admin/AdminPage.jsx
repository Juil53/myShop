import React from "react";
import MyDrawer from "./AdminPage/Component/Drawer";
import routeAdmin from "../../routes/AdminRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";

const drawerWidth = "14rem";
const routes = routeAdmin.map((route, index) => (
  <Route key={index} path={route.path} element={route.element} />
));

function AdminPage() {
  return (
    <div>
      <BrowserRouter>
        <Box sx={{ display: "flex" }}>
          <MyDrawer />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
            }}
          >
            <Toolbar />
            <Routes>{routes}</Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </div>
  );
}

export default AdminPage;
