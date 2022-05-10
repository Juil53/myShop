import React from "react";
import routeUser from "../../routes/UserRoute";
import { Routes, Route } from "react-router-dom";

import Home from "./home-page/HomePage";

const routes = routeUser.map((route, index) => (
  <Route key={index} path={route.path} element={route.element} />
));

function UserContainer() {
  return (
    <Routes>
      <Route path="/" element={Home} />
    </Routes>
  );
}

export default UserContainer;
