import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

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
    element: lazy(() => import("../pages/admin/admin_page/user_management/UserManagement")),
  },
  {
    page: "AddUser",
    exact: true,
    path: "/users/add",
    element: lazy(() => import("../pages/admin/admin_page/user_management/AddUser")),
  },
  {
    page: "EditUser",
    exact: true,
    path: "/users/edit/:id",
    element: lazy(() => import("../pages/admin/admin_page/user_management/UserEdit")),
  },
  {
    page: "ProductManagement",
    exact: true,
    path: "/products",
    element: lazy(() => import("../pages/admin/admin_page/product_management/ProductManagement")),
  },
  {
    page: "AddProduct",
    exact: true,
    path: "/products/add",
    element: lazy(() =>
      import("../pages/admin/admin_page/product_management/add_product/AddProduct")
    ),
  },
  {
    page: "EditProduct",
    exact: true,
    path: "/products/edit/:id",
    element: lazy(() => import("../pages/admin/admin_page/product_management/EditProduct")),
  },
  {
    page: "OrderManagement",
    exact: true,
    path: "/orders",
    element: lazy(() => import("../pages/admin/admin_page/order_management/OrderManagement")),
  },
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
            <route.element />
          </Suspense>
        }
      />
    );
  });
};

export { renderRouteAdmin };
