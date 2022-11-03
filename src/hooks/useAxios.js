import { useEffect } from "react";
import useAuth from "./useAuth";
import axios from "lib/axios";

const useAxios = () => {
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axios.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.jwtToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axios.interceptors.request.eject(requestIntercept);
    };
  }, [auth]);

  return axios;
};

export default useAxios;
