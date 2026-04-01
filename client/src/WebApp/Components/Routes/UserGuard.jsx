import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UserGuard = () => {
  const user = useSelector((state) => state.user_email);
  return user ? <Outlet /> : <Navigate to="/UserLogin" replace />;
};

export default UserGuard;
