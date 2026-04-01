import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const MerchantGuard = () => {
  const merchant = useSelector((state) => state.merchant);
  // Ensure we check for actual valid merchant state, e.g., token existence
  const isAuthenticated = merchant && merchant.token;
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/merchant-login" replace />;
};

export default MerchantGuard;
