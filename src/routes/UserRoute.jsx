import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/user/home-page/HomePage";
import ProductDetail from "../pages/user/product-detail/ProductDetail";
import Wrapper from "../pages/user/Wrapper";

function UserRoutes() {
  return (
    <Routes> 
      <Route path="" element={<Wrapper />}>
        <Route path="" element={<Home currentPage="home" />} />
        <Route path="product" element={<ProductDetail />} />
      </Route>
    </Routes>
  );
}

export default UserRoutes;
