import React from "react";
import { lazy } from "react";


const Homepage = lazy(() => import("../pages/User/HomePage/Homepage"))

const routeUser = [
  {
    page: "Homepage",
    exact: false,
    path: "/",
    element: (
      <React.Suspense fallback={<>...</>}>
        <Homepage />
      </React.Suspense>
    ),
  },
];

export default routeUser;
