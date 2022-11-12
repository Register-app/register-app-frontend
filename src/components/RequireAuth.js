import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { user } = useAuth();
  const location = useLocation();

  return user?.roles?.find((role) => allowedRoles?.includes(role.name)) ? (
    <Outlet />
  ) : user?.email ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
