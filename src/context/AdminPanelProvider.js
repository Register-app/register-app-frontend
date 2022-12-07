import { createContext, useState } from "react";

const AdminPanelContext = createContext({});

export const AdminPanelProvider = ({ children }) => {
  const [student, setStudent] = useState(null);

  return (
    <AdminPanelContext.Provider
      value={{
        student,
        setStudent,
      }}
    >
      {children}
    </AdminPanelContext.Provider>
  );
};

export default AdminPanelContext;
