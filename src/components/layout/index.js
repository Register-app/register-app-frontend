import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="Layout">
      <Outlet />
    </main>
  );
};

export default Layout;
