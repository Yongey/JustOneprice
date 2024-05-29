/* eslint-disable no-unused-vars */
import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./routes/Home";

import Wholesale from "./routes/Wholesale";
import AboutUs from "./Components/AboutUs";
import Login from "./routes/Login";
import DB from "./Components/DeleteButtonVision";
import Checkout from "./routes/CheckOut";
import Admin from "./routes/AdminPage";
import OrderManage from "./Admin/OrderManagement";
import UserManage from "./Admin/UserManagement";
import ProductManage from "./Admin/ProductManagement";
import { AuthProvider } from "./routes/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wholesale" element={<Wholesale />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Auth" element={<Login />} />
        <Route path="/DB" element={<DB />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Admin/OrderManage" element={<OrderManage />} />
        <Route path="/Admin/UserManage" element={<UserManage />} />
        <Route path="/Admin/ProductManage" element={<ProductManage />} />
      </Routes>
    </div>
  );
};

export default App;
