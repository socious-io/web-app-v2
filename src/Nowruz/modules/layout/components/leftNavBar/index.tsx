import { useState } from 'react';

import { Footer } from './footer/footer';
import { LinksContainer } from './linksContainer/linksContainer';

export const LeftNavBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`${open ? 'w-[280px]' : 'w-[82px]'} h-full bg-Brand-700 flex flex-col`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(true)}
    >
      <LinksContainer open={open} />
      <Footer open={open} />
    </div>
  );
};
