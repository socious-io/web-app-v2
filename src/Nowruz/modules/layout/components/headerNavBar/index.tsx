import React, { useState } from 'react';
import { Input } from 'src/Nowruz/modules/general/components/input/input';
import NotifBellIcon from './notifBellIcon';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Icon } from 'src/Nowruz/general/Icon';
import { Dot } from 'src/Nowruz/modules/general/components/dot';
import variables from 'src/components/_exports.module.scss';

const HeaderNavBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="h-18 w-full px-8 flex justify-between items-center border border-x-0 border-t-0 border-b-Gray-light-mode-200 bg-Base-White">
      <Input
        id="search-input"
        name="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search"
      />
      <div className="flex w-fit h-10 gap-2">
        <NotifBellIcon unread />
        <Button variant="outlined" className="w-33" color="primary">
          <Dot size="small" color={variables.color_success_500} shadow shadowColor={variables.color_success_100} />
          <Icon name="Dot" className="text-Success-500" fontSize={20} />
          {'Status'}
          <Icon name="chevron-down" className="text-Gray-light-mode-700" fontSize={20} />
        </Button>
      </div>
    </div>
  );
};

export default HeaderNavBar;
