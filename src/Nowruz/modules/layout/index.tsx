import { Outlet } from 'react-router-dom';

import HeaderNavBar from './components/headerNavBar';
import { NavBar } from './components/navBar';

export const Layout = () => {
  return (
    <div className="w-full h-screen relative">
      <div className="w-full h-full flex flex-col md:pl-20">
        <HeaderNavBar />
        <Outlet />
      </div>
      <div className="h-full absolute top-0 left-0">
        <NavBar />
      </div>
    </div>
  );
};
