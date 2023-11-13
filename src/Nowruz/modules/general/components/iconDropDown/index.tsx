import { Divider } from '@mui/material';
import React, { useState } from 'react';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { IconListItem } from 'src/Nowruz/modules/general/components/avatarDropDown/iconListItem';
import { AvatarLabelGroup } from 'src/Nowruz/modules/general/components/avatarLabelGroup';

import { IconDropDownProps } from './iconDropDown.types';

export const IconDropDown: React.FC<IconDropDownProps> = (props) => {
  const { size = '40px', type, img, iconName, customStyle, accounts = [], iconItems = [], customItems = [] } = props;
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full flex flex-col items-end">
      <div className="flex items-center justify-end">
        <Avatar size={size} type={type} img={img} iconName={iconName} onClick={() => setOpen(!open)} />
      </div>
      {open && (
        <div
          className={`w-[280px] bg-Base-White border border-solid border-Gray-light-mode-200 rounded-default shadow-Shadows/shadow-lg flex flex-col ${customStyle}`}
        >
          {accounts.map((a) => (
            <AvatarLabelGroup key={a.id} account={a} />
          ))}
          {iconItems.length ? <Divider /> : ''}
          {iconItems.map((i) => (
            <IconListItem key={i.label} iconName={i.iconName} label={i.label} />
          ))}
          {customItems.length ? <Divider /> : ''}
          {customItems.map((i) => i)}
        </div>
      )}
    </div>
  );
};
