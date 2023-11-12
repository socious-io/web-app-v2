import { useState } from 'react';

import { Footer } from './footer/footer';
import { LinksContainer } from './linksContainer/linksContainer';

export const NavBar = () => {
  const [open, setOpen] = useState(true);
  return (
    <div
      className={`w-full${
        open ? 'w-full md:w-[280px]' : 'hidden md:block w-[82px]'
      } h-full bg-Base-White md:bg-Brand-700 flex flex-col`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <LinksContainer open={open} />
      <Footer open={open} />
    </div>
  );
};
