import jwtDecode from "jwt-decode";

export const checkRoles = (user, allowedRoles) => {
  const decoded = user?.jwtToken ? jwtDecode(user.jwtToken) : undefined;

  const roles = decoded?.roles || [];

  return roles.find((role) => allowedRoles?.includes(role)) ? true : false;
};
