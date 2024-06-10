// ProtectedRoute.js

import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { AuthContext } from "../routes/AuthContext";

const ProtectedRoute = ({ element, ...rest }) => {
  const { isAdminUser, token } = useContext(AuthContext);

  return token && isAdminUser() ? (
    <Navigate to="/admin" />
  ) : token ? (
    <Navigate to="/" /> // Redirect regular users to the home page if they try to access the login page
  ) : (
    <Route {...rest} element={element} />
  );
};

export default ProtectedRoute;
