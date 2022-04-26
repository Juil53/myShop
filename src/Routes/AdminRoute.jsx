import React from "react";
import { lazy } from "react";

const DashboardPage = lazy(() => import("../pages/Admin/AdminPage/Dashboard"));
const UserManagementPage = lazy(() =>
  import("../pages/Admin/AdminPage/UserManagement")
);
const ProductManagementPage = lazy(() =>
  import("../pages/Admin/AdminPage/ProductManagement")
);

const routeAdmin = [
  {
    page: "Dashboard",
    exact: false,
    path: "/dashboard",
    element: (
      <React.Suspense fallback={<>...</>}>
        <DashboardPage />
      </React.Suspense>
    ),
  },
  {
    page: "UserManagement",
    exact: false,
    path: "/user-management",
    element: (
      <React.Suspense fallback={<>...</>}>
        <UserManagementPage />
      </React.Suspense>
    ),
  },
  {
    page: "ProductManagement",
    exact: false,
    path: "/product-management",
    element: (
      <React.Suspense fallback={<>...</>}>
        <ProductManagementPage />
      </React.Suspense>
    ),
  },
];

export default routeAdmin;
