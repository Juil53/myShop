import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/user/home_page/HomePage";
import ProductDetail from "../pages/user/product_detail/ProductDetail";
import SigninSignup from "../pages/user/signin_signup/SigninSignup";
import Wrapper from "../pages/user/Wrapper";
import SearchProduct from "../pages/user/search_products/SearchProduct";
import CartPage from "../pages/user/cart_page/CartPage";
import Payment from "../pages/user/payment/Payment";
import UserPage from "../pages/user/user_page/UserPage";
import About from "../pages/user/about/About";
import Map from "../pages/user/map/Map";

function UserRoutes() {
  return (
    <Routes>
      <Route path="" element={<Wrapper />}>
        <Route path="" element={<Home currentPage="home" />} />
        <Route path="home" element={<Home currentPage="home" />} />
        <Route path="product" element={<SearchProduct />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="sign" element={<SigninSignup />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="payment" element={<Payment />} />
        <Route path="map" element={<Map />} />
        <Route path="about" element={<About />} />
        <Route path="user/*" element={<UserPage />} />
      </Route>
    </Routes>
  );
}

export default UserRoutes;
