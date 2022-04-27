import React from "react";
import MyDrawer from "./AdminPage/Drawer";
import routeAdmin from "../../Routes/AdminRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const routes = routeAdmin.map((route, index) => (
  <Route key={index} path={route.path} element={route.element} />
));

function AdminPage() {
  return (
    <div className="container admin">
      <BrowserRouter>
        <MyDrawer />
        <Routes>{routes}</Routes>
      </BrowserRouter>
    </div>
  );
}

export default AdminPage;
