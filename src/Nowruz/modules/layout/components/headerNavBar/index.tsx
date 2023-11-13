import React, { useState } from 'react';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Dot } from 'src/Nowruz/modules/general/components/dot';
import { Input } from 'src/Nowruz/modules/general/components/input/input';

import NotifBellIcon from './notifBellIcon';

const HeaderNavBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="h-16 md:h-20 w-full px-4 md:px-8 flex justify-between items-center bg-Base-White border border-solid border-x-0 border-t-0 border-b-Gray-light-mode-200 shadow-Shadows/shadow-sm md:[box-shadow:none] ">
      <div className="md:hidden w-10 h-10 p-2 rounded-default">
        <Icon fontSize={24} name="menu-02" color={variables.color_grey_500} />
      </div>
      <div className="hidden md:block">
        <Input
          id="search-input"
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
        />
      </div>
      <div className="flex w-fit h-10 gap-2 items-center">
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
        <Avatar type="users" size="40px" />
      </div>
    </div>
  );
};

export default HeaderNavBar;
