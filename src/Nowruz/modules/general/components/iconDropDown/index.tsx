import { Divider } from '@mui/material';
import React from 'react';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { IconListItem } from 'src/Nowruz/modules/general/components/avatarDropDown/iconListItem';
import { AvatarLabelGroup } from 'src/Nowruz/modules/general/components/avatarLabelGroup';

import { IconDropDownProps } from './iconDropDown.types';
import { useIconDropDown } from './useIconDropDown';

export const IconDropDown: React.FC<IconDropDownProps> = (props) => {
  const { size = '40px', type, img, iconName, customStyle, accounts = [], iconItems = [], customItems = [] } = props;
  const { open, setOpen, switchAccount } = useIconDropDown();
  return (
    <div className="flex flex-col items-end relative ">
      <div className="flex items-center justify-end">
        <Avatar size={size} type={type} img={img} iconName={iconName} onClick={() => setOpen(!open)} />
      </div>
      {open && (
        <div
          className={`w-[280px] bg-Base-White border border-solid border-Gray-light-mode-200 rounded-default shadow-Shadows/shadow-lg flex flex-col absolute top-[48px] ${customStyle}`}
        >
          {accounts.map((a) => (
            <AvatarLabelGroup key={a.id} account={a} handleClick={() => switchAccount(a.id)} />
          ))}
          {iconItems.length ? <Divider /> : ''}
          {iconItems.map((i) => (
            <IconListItem key={i.label} iconName={i.iconName} label={i.label} onClick={i.onClick} />
          ))}
          {customItems.length ? <Divider /> : ''}
          {customItems.map((i) => i)}
        </div>
      )}
    </div>
  );
};
