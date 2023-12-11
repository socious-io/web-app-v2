import { Divider, IconButton, MenuItem, MenuList } from '@mui/material';
import React, { createRef, useRef } from 'react';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { IconListItem } from 'src/Nowruz/modules/general/components/avatarDropDown/iconListItem';
import { AvatarLabelGroup } from 'src/Nowruz/modules/general/components/avatarLabelGroup';

import css from './iconDropDown.module.scss';
import { IconDropDownProps } from './iconDropDown.types';
import { useIconDropDown } from './useIconDropDown';

export const IconDropDown: React.FC<IconDropDownProps> = (props) => {
  const { size = '40px', type, img, iconName, customStyle, accounts = [], iconItems = [], customItems = [] } = props;
  const { open, setOpen, switchAccount } = useIconDropDown();

  return (
    <div className="flex flex-col items-end relative">
      <IconButton
        className={`${css.avatarBtn} ${open && `${css.avatarBtnOpen}`}`}
        disableRipple
        onClick={() => setOpen(!open)}
      >
        <Avatar
          size={size}
          type={type}
          img={img}
          iconName={iconName}
          onClick={() => setOpen(!open)}
          iconCustomStyle="!cursor-pointer"
        />
      </IconButton>
      {open && (
        <MenuList autoFocusItem className={`${css.menuList} ${customStyle}`}>
          {accounts.map((a) => (
            <MenuItem key={a.id} className={css.menuItem}>
              <AvatarLabelGroup account={a} handleClick={() => switchAccount(a.id)} />
            </MenuItem>
          ))}
          {iconItems.length ? <Divider className="!m-0" /> : ''}
          {iconItems.map((i) => (
            <MenuItem key={i.label} className={css.menuItem}>
              <IconListItem iconName={i.iconName} label={i.label} onClick={i.onClick} />
            </MenuItem>
          ))}
          {customItems.length ? <Divider className="!m-0" /> : ''}
          {customItems.map((i) => (
            <MenuItem sx={{ padding: '0' }} className={css.menuItem}>
              {i}
            </MenuItem>
          ))}
        </MenuList>
      )}
    </div>
  );
};
