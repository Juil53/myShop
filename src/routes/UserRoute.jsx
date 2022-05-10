import React from "react";
import { lazy } from "react";

const Homepage = lazy(() => import("../pages/user/home-page/HomePage"));

const routeUser = [
  {
    page: "Homepage",
    exact: false,
    path: "/home",
    element: <Homepage />,
  },
];

export default routeUser;
