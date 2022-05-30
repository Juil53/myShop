import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const routeAdmin = [
  {
    page: "Dashboard",
    exact: true,
    path: "/dashboard",
    element: lazy(() =>
      import("../pages/admin/admin_page/dashboard/Dashboard")
    ),
  },
  {
    page: "UserManagement",
    exact: true,
    path: "/user-management",
    element: lazy(() =>
      import("../pages/admin/admin_page/user_management/UserManagement")
    ),
  },
  {
    page: "AddUser",
    exact: true,
    path: "/user-management/add-user",
    element: lazy(() =>
      import("../pages/admin/admin_page/user_management/AddUser")
    ),
  },
  {
    page: "ProductManagement",
    exact: true,
    path: "/product-management",
    element: lazy(() =>
      import("../pages/admin/admin_page/product_management/ProductManagement")
    ),
  },
  {
    page: "AddProduct",
    exact: true,
    path: "/product-management/add-product",
    element: lazy(() =>
      import("../pages/admin/admin_page/product_management/AddProduct")
    ),
  },
  {
    page: "EditProduct",
    exact: true,
    path: "/product-management/edit-product",
    element: lazy(() =>
      import("../pages/admin/admin_page/product_management/EditProduct")
    ),
  },
  {
    page: "OrderManagement",
    exact: true,
    path: "/order-management",
    element: lazy(() =>
      import("../pages/admin/admin_page/order_management/OrderManagement")
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
