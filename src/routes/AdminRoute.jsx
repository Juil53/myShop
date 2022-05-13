import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const routeAdmin = [
  {
    page: "Dashboard",
    exact: true,
    path: "/dashboard",
    element: lazy(() =>
      import("../pages/admin/admin-page/dashboard/Dashboard")
    ),
  },
  {
    page: "UserManagement",
    exact: true,
    path: "/user-management",
    element: lazy(() =>
      import("../pages/admin/admin-page/user-management/UserManagement")
    ),
  },
  {
    page: "ProductManagement",
    exact: true,
    path: "/product-management",
    element: lazy(() =>
      import("../pages/admin/admin-page/product-management/ProductManagement")
    ),
  },
  {
    page: "AddProduct",
    exact: true,
    path: "/add-product",
    element: lazy(() =>
      import("../pages/admin/admin-page/product-management/AddProduct")
    ),
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
