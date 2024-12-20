import React from "react";
import { Navigate, Outlet } from "react-router";

function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/melissa-admin" />;
  }
  //console.log(token);
  return children ? children : <Outlet />;
}

export default AdminRoute;
