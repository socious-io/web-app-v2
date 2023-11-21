import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import HeaderNavBar from './components/headerNavBar';
import { NavBar } from './components/navBar';

export const Layout = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full h-screen relative">
      <div className="w-full h-full relative flex flex-col md:pl-20">
        <div className="w-full fixed top-0 right-0 z-20 bg-Base-White ">
          <HeaderNavBar setOpen={setOpen} />
        </div>

        <div className="w-full mt-16 md:mt-[72px] z-10 ">
          <Outlet />
        </div>
      </div>

      <NavBar open={open} setOpen={setOpen} />
    </div>
  );
};
