import React, { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { customerInputs } from "../pages/admin/admin_page/customers/customerInput";

const routeAdmin = [
  {
    page: "Dashboard",
    exact: true,
    path: "/dashboard",
    element: lazy(() => import("../pages/admin/admin_page/dashboard/Dashboard")),
  },
  {
    page: "UserManagement",
    exact: true,
    path: "/users",
    element: lazy(() => import("../pages/admin/admin_page/users/UserManagement")),
  },
  {
    page: "AddUser",
    exact: true,
    path: "/users/add",
    element: lazy(() => import("../pages/admin/admin_page/users/AddUser")),
  },
  {
    page: "EditUser",
    exact: true,
    path: "/users/edit/:id",
    element: lazy(() => import("../pages/admin/admin_page/users/UserEdit")),
  },
  {
    page: "ProductManagement",
    exact: true,
    path: "/products",
    element: lazy(() => import("../pages/admin/admin_page/products/ProductManagement")),
  },
  {
    page: "AddProduct",
    exact: true,
    path: "/products/add",
    element: lazy(() => import("../pages/admin/admin_page/products/add_product/AddProduct")),
  },
  {
    page: "EditProduct",
    exact: true,
    path: "/products/edit/:id",
    element: lazy(() => import("../pages/admin/admin_page/products/EditProduct")),
  },
  {
    page: "OrderManagement",
    exact: true,
    path: "/orders",
    element: lazy(() => import("../pages/admin/admin_page/orders/OrderManagement")),
  },
  {
    page: "CustomerManagement",
    exact: true,
    path: "/customers",
    element: lazy(() => import("../pages/admin/admin_page/customers/CustomerManagement")),
  },
  {
    page: "CustomerProfile",
    exact: true,
    path: "/customers/:id",
    element: lazy(() => import("../pages/admin/admin_page/customers/Customer")),
  },
  {
    page: "CustomerAdding",
    exact: true,
    path: "/customers/add",
    element: lazy(() => import("../pages/admin/admin_page/customers/CustomerAdding")),
  },
  {
    page: "AdminLogin",
    exact: true,
    path: "/login",
    element: lazy(() => import("../pages/admin/signin_admin/Signin")),
  },
  // {
  //   page: "404",
  //   exact: true,
  //   path: "*",
  //   element: lazy(() => import("../pages/PageNotFound")),
  // },
];

const renderRouteAdmin = () => {
  return routeAdmin.map((route, index) => {
    return (
      <Route
          key={index}
          exact={route.exact}
          path={route.path}
          element={
            <Suspense fallback={<>...</>}>
              <route.element inputs={customerInputs} />
            </Suspense>
          }
        />
    );
  });
};

export { renderRouteAdmin };
