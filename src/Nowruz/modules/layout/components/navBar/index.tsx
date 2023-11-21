import { Icon } from 'src/Nowruz/general/Icon';

import { Footer } from './footer/footer';
import { LinksContainer } from './linksContainer/linksContainer';

interface NavBarProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}
export const NavBar: React.FC<NavBarProps> = ({ open, setOpen }) => {
  return (
    <div
      className={` h-full fixed top-0 left-0 z-50 ${
        open ? 'w-full  md:w-[280px] ' : ' hidden md:block w-[82px] '
      } h-full bg-Base-White md:bg-Brand-700 flex`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex flex-col w-full h-full">
        <LinksContainer open={open} />
        <Footer open={open} />
      </div>
      <div className="w-fit h-full md:hidden bg-Gray-light-mode-900 opacity-70 p-4 ">
        <Icon name="x-close" fontSize={12} className="text-Base-White cursor-pointer" onClick={() => setOpen(false)} />
      </div>
    </div>
  );
};
