import { Typography } from '@mui/material';
import { LeftNavBarItemProps } from './leftNavBar.types';
import { useState } from 'react';

export const LeftNavBarItem: React.FC<LeftNavBarItemProps> = (props) => {
  const [open, setOpen] = useState(false);
  const { children, icon, label, navigateFunc } = props;
  const menuOpen = props.open;
  return (
    <>
      <div className="w-full h-12 bg-Brand-700 hover:bg-Brand-600 px-3 py-2 rounded-sm flex gap-2">
        {icon}
        {menuOpen && (
          <>
            <Typography
              variant="h4"
              className="text-Brand-100 cursor-pointer hover:text-Base-White"
              onClick={navigateFunc}
            >
              {label}
            </Typography>
            {children?.length ? (
              open ? (
                <img src="icons/nowruz/chevron-up.svg" onClick={() => setOpen(!open)} />
              ) : (
                <img src="icons/nowruz/chevron-down.svg" onClick={() => setOpen(!open)} />
              )
            ) : (
              ''
            )}
          </>
        )}
      </div>
      {open &&
        children?.map((item) => (
          <div className="w-full h-10 pr-3 pl-11 py-2 rounded-sm bg-Brand-700 hover:bg-Brand-600 ">
            <Typography variant="h4" className="text-Brand-100 cursor-pointer" onClick={item.navigateFunc}>
              {item.label}
            </Typography>
          </div>
        ))}
    </>
  );
};
