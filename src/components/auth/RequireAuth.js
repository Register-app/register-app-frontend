import { Navigate, Outlet, useLocation } from "react-router-dom";
import { checkRoles } from "utils/checkRoles";

const RequireAuth = ({ user, allowedRoles }) => {
  const location = useLocation();

  return checkRoles(user, allowedRoles) ? (
    <Outlet />
  ) : checkRoles(user, ["ROLE_ADMIN"]) ? (
    <Navigate to="/panel" state={{ from: location }} replace />
  ) : user?.email ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
