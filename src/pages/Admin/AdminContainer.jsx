import React from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import MyDrawer from "./AdminPage/Component/Drawer";

export default function AdminContainer(props) {
  const { exact, path, element } = props;
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
          <Routes>
            <Route exact={exact} path={path} element={element} />
          </Routes>
        </Box>
      </Box>
    </>
  );
}
