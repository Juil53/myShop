import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/user/home_page/HomePage";
import ProductDetail from "../pages/user/product_detail/ProductDetail";
import SigninSignup from "../pages/user/signin_signup/SigninSignup";
import Wrapper from "../pages/user/Wrapper";
import SearchProduct from "../pages/user/search_products/SearchProduct";

function UserRoutes() {
  return (
    <Routes>
      <Route path="" element={<Wrapper />}>
        <Route path="" element={<Home currentPage="home" />} />
        <Route path="product" element={<SearchProduct />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="sign" element={<SigninSignup />} />
      </Route>
    </Routes>
  );
}

export default UserRoutes;
