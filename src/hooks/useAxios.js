import { useEffect } from "react";
import useAuth from "./useAuth";
import axios from "lib/axios";

const useAxios = () => {
  const { user } = useAuth();

  useEffect(() => {
    const requestIntercept = axios.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${user?.jwtToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axios.interceptors.request.eject(requestIntercept);
    };
  }, [user]);

  return axios;
};

export default useAxios;
