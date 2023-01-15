import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="h-screen flex flex-col mx-auto ">
      <Outlet />
    </div>
  );
};
export default Layout;
