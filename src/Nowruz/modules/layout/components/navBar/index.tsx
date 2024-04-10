import React from 'react';
import { Icon } from 'src/Nowruz/general/Icon';

import { Footer } from '../footer/footer';
import { LinksContainer } from '../linksContainer/linksContainer';

interface NavBarProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  logout: () => void;
}
export const NavBar: React.FC<NavBarProps> = ({ open, setOpen, logout }) => {
  return (
    <div
      className={` h-full fixed top-0 left-0 z-50 ${
        open ? 'w-full md:w-[280px] ' : ' hidden md:block w-[82px] '
      } h-full flex sidebar`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      tabIndex={1}
    >
      <div className={`flex flex-col w-full h-full bg-Base-White md:bg-Brand-700 `}>
        <LinksContainer open={open} setOpen={setOpen} />
        <Footer open={open} setOpen={setOpen} logout={logout} />
      </div>
      <div className="w-fit h-full md:hidden p-4 backdrop-blur-sm backdrop">
        <Icon name="x-close" fontSize={22} className="text-Base-White cursor-pointer " onClick={() => setOpen(false)} />
      </div>
    </div>
  );
};
