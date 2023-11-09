import React, { useState } from 'react';
import { LeftNavBarProps } from './leftNavBar.types';
import css from './index.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';
import { LeftNavBarItem } from './LeftNavBarItem';

export const LeftNavBar: React.FC<LeftNavBarProps> = () => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`${open ? 'w-[280px]' : 'w-[82px]'} h-full bg-Brand-700 flex flex-col`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex flex-col justify-start items-center w-full h-fit pt-8 gap-6">
        <div className="w-full h-fit py-0 pl-6 pr-5">
          <img src={open ? '/icons/nowruz/logo-white.svg' : '/icons/nowruz/logoMark-white.svg'} alt="" />
        </div>
        <div className="flex flex-col gap-2 px-4 ">
          <LeftNavBarItem
            label="Dashboard"
            navigateFunc={() => {}}
            icon={<Icon name="home-line" color="white" fontSize={24} />}
            open={open}
          />
          <LeftNavBarItem
            label="Jobs"
            navigateFunc={() => {}}
            icon={<Icon name="briefcase-01" fontSize={24} />}
            children={[
              { label: 'Find work', navigateFunc: () => {} },
              { label: 'Saved jobs', navigateFunc: () => {} },
            ]}
            open={open}
          />
        </div>
      </div>
    </div>
  );
};
