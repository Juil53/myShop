import React from "react";
import routeUser from "../../routes/UserRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

const routes = routeUser.map((route, index) => (
  <Route key={index} path={route.path} element={route.element} />
));

function UserContainer() {
  return (
    <div>
      <BrowserRouter>
        <Box sx={{ display: "flex" }}>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              mt:8,
            }}
          >
            <Routes>{routes}</Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </div>
  );
}

export default UserContainer;
