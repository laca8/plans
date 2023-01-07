import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Login from "../../pages/user/Login";
import RegisterScreen from "../../pages/user/Register";
import { useSelector } from "react-redux";
const ProtectedRoutes = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return <>{userInfo?.user ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default ProtectedRoutes;
