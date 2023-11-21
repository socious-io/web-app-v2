import React, { useState } from 'react';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Dot } from 'src/Nowruz/modules/general/components/dot';
import { Input } from 'src/Nowruz/modules/general/components/input/input';

import NotifBellIcon from './notifBellIcon';
import { IconDropDown } from 'src/Nowruz/modules/general/components/iconDropDown';
import { useHeaderNavBar } from './useHeaderNavBar';

interface HeaderNavBarProps {
  setOpen: (val: boolean) => void;
}
const HeaderNavBar: React.FC<HeaderNavBarProps> = ({ setOpen }) => {
  const { userIsLoggedIn, userType, image, accounts } = useHeaderNavBar();

  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="h-16 md:h-[72px] w-full px-4 md:px-8 flex justify-between items-center bg-Base-White border border-solid border-x-0 border-t-0 border-b-Gray-light-mode-200 shadow-Shadows/shadow-sm md:[box-shadow:none] ">
      <div
        className="md:hidden w-10 h-10 p-2 rounded-default"
        onClick={() => {
          setOpen(true);
        }}
      >
        <Icon fontSize={24} name="menu-02" color={variables.color_grey_500} />
      </div>
      <div className="hidden md:block md:ml-20">
        <Input
          id="search-input"
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
        />
      </div>
      {userIsLoggedIn && (
        <div className="flex w-fit h-10 gap-2 ">
          <div className="hidden md:block">
            <NotifBellIcon unread />
          </div>
          <div className="flex gap-4 md:hidden mr-2">
            <Icon name="search-lg" fontSize={24} className="text-Gray-light-mode-500" />
            <Icon name="bell-01" fontSize={24} className="text-Gray-light-mode-500" />
          </div>
          <div className="hidden md:block">
            <Button variant="outlined" className="flex w-33 gap-2" color="primary">
              <Dot size="small" color={variables.color_success_500} shadow shadowColor={variables.color_success_100} />
              {'Status'}
              <Icon name="chevron-down" className="text-Gray-light-mode-700" fontSize={20} />
            </Button>
          </div>

          <IconDropDown
            type={userType}
            img={image}
            accounts={accounts}
            iconItems={[
              { iconName: 'help-circle', label: 'Support' },
              { iconName: 'log-out-01', label: 'Log out' },
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default HeaderNavBar;
