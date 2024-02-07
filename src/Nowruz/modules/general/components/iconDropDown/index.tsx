import { Divider, IconButton, MenuItem, MenuList } from '@mui/material';
import React from 'react';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { IconListItem } from 'src/Nowruz/modules/general/components/avatarDropDown/iconListItem';
import { AvatarLabelGroup } from 'src/Nowruz/modules/general/components/avatarLabelGroup';

import css from './iconDropDown.module.scss';
import { IconDropDownProps } from './iconDropDown.types';
import { useIconDropDown } from './useIconDropDown';

export const IconDropDown: React.FC<IconDropDownProps> = (props) => {
  const {
    size = '40px',
    type,
    img,
    iconName,
    customStyle,
    accounts = [],
    iconItems = [],
    customItems = [],
    createItem = false,
  } = props;
  const currentAccount = accounts.find((a) => a.selected);
  const otherAccounts = accounts.filter((a) => !a.selected);
  const { open, handleOpen, handleClose, switchAccount, myProfile, handleClick } = useIconDropDown();

  return (
    <div className="flex flex-col items-end relative">
      <IconButton
        className={`${css.avatarBtn} ${open && `${css.avatarBtnOpen}`}`}
        disableRipple
        onClick={handleClick}
        aria-label="icon-button"
      >
        <Avatar
          size={size}
          type={type}
          img={img}
          iconName={iconName}
          iconCustomStyle={'!cursor-pointer'}
        />
      </IconButton>
      {open && (
        <MenuList autoFocusItem className={`${css.menuList} ${customStyle}`} onMouseLeave={handleClose}>
          <MenuItem
            key={currentAccount!.id}
            className={css.menuItem}
            onFocus={handleOpen}
            onBlur={handleClose}
            onMouseDown={handleClose}
            onClick={handleClose}
          >
            <AvatarLabelGroup account={currentAccount!} />
          </MenuItem>
          <Divider className="!m-0" />
          {otherAccounts.map((a) => (
            <MenuItem
              key={a.id}
              className={css.menuItem}
              onFocus={handleOpen}
              onBlur={handleClose}
              onMouseDown={() => switchAccount(a.id)}
              onClick={() => switchAccount(a.id)}
            >
              <AvatarLabelGroup account={a} />
            </MenuItem>
          ))}
          {createItem && (
            <MenuItem
              key="create-account"
              className={css.menuItem}
              onFocus={handleOpen}
              onBlur={handleClose}
              onMouseDown={handleClose}
              onClick={handleClose}
            >
              <IconListItem
                iconName="plus"
                label={currentAccount?.type === 'users' ? 'Create an organization' : 'Create a talent profile'}
                customIconClass="text-Brand-700"
                customLabelClass={css.createLabel}
              />
            </MenuItem>
          )}
          {iconItems.length ? <Divider className="!m-0" /> : ''}
          {iconItems.map((i) => (
            <MenuItem
              key={i.label}
              className={css.menuItem}
              onFocus={handleOpen}
              onBlur={handleClose}
              onMouseDown={i.onClick}
              onClick={i.onClick}
            >
              <IconListItem iconName={i.iconName} label={i.label} />
              <Divider className="!m-0 w-full" />
            </MenuItem>
          ))}
          {customItems.length ? <Divider className="!m-0" /> : ''}
          {customItems.map((i) => (
            <MenuItem sx={{ padding: '0' }} className={css.menuItem} onFocus={handleOpen} onBlur={handleClose}>
              {i}
            </MenuItem>
          ))}
        </MenuList>
      )}
    </div>
  );
};
