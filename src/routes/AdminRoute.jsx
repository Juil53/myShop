import AdminContainer from "../pages/admin/AdminContainer";
import Dashboard from "../pages/admin/admin-page/dashboard/Dashboard";
import UserManagement from "../pages/admin/admin-page/user-management/UserManagement";
import ProductManagement from "../pages/admin/admin-page/product-management/ProductManagement";

const routeAdmin = [
  {
    page: "Dashboard",
    exact: false,
    path: "/admin/dashboard",
    element: <Dashboard />,
  },
  {
    page: "UserManagement",
    exact: false,
    path: "/admin/user-management",
    element: <UserManagement />,
  },
  {
    page: "ProductManagement",
    exact: false,
    path: "/admin/product-management",
    element: <ProductManagement />,
  },
];

const renderRouteAdmin = () => {
  return routeAdmin.map((route, index) => {
    return (
      <AdminContainer
        key={index}
        exact={route.exact}
        path={route.path}
        element={route.element}
      />
    );
  });
};

export { renderRouteAdmin };
