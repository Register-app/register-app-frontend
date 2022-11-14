export const checkRoles = (user, { allowedRoles }) => {
  return user?.roles?.find((role) => allowedRoles?.includes(role.name))
    ? true
    : false;
};
