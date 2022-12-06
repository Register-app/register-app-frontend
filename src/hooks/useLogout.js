import useAuth from "./useAuth";

const useLogout = () => {
  const { setUser } = useAuth();

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return logout;
};

export default useLogout;
