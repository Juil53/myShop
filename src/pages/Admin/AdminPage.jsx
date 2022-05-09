import React from "react";
import MyDrawer from "./AdminPage/Component/Drawer";
import routeAdmin from "../../routes/AdminRoute";
import { Route } from "react-router-dom";
import { Box } from "@mui/material";

const routes = routeAdmin.map((route, index) => (
  <Route key={index} path={route.path} element={route.element} />
));

function AdminPage() {
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
            mt: 8,
          }}
        >
          {routes}
        </Box>
      </Box>
    </>
  );
}

export default AdminPage;
