import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminGuard = () => {
  const admin = useSelector((state) => state.admin);
  const adminEmail = useSelector((state) => state.admin_email);
  
  // Either state.admin or state.admin_email could be set depending on the login flow
  const isAuthenticated = admin || adminEmail;
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/AdminLogin" replace />;
};

export default AdminGuard;
