import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/user/home_page/HomePage";
import ProductDetail from "../pages/user/product_detail/ProductDetail";
import SigninSignup from "../pages/user/signin_signup/SigninSignup";
import Wrapper from "../pages/user/Wrapper";

function UserRoutes() {
  return (
    <Routes>
      <Route path="" element={<Wrapper />}>
        <Route path="" element={<Home currentPage="home" />} />
        <Route path="product" element={<ProductDetail />} />
        <Route path="sign" element={<SigninSignup />} />
      </Route>
    </Routes>
  );
}

export default UserRoutes;
