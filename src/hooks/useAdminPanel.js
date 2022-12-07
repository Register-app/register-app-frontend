import { useContext } from "react";
import AdminPanelContext from "context/AdminPanelContext";

const useAdminPanel = () => {
  return useContext(AdminPanelContext);
};

export default useAdminPanel;
