import { MenuItem, MenuList } from '@mui/material';
import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';
import { IconButton } from 'src/Nowruz/modules/general/components/iconButton';

import css from './threeDotButton.module.scss';
import { ThreeDotsButtonProps } from './threeDotsButton.types';
import { useThreeDotsButton } from './useThreeDotsButton';

export const ThreeDotsButton: React.FC<ThreeDotsButtonProps> = ({ otherIdentityId }) => {
  const { openMenu, setOpenMenu, handleClose, menuItems, handleBlock, connectionStatus } =
    useThreeDotsButton(otherIdentityId);
  return (
    <div className="relative">
      <IconButton
        size="small"
        iconName="dots-vertical"
        iconColor={variables.color_grey_700}
        iconSize={20}
        customStyle="w-9 h-10 !border !border-solid !border-Gray-light-mode-300"
        onClick={() => setOpenMenu(!openMenu)}
      />
      {openMenu && (
        <MenuList autoFocusItem className={css.menuList} onMouseLeave={handleClose}>
          {menuItems.map((item) => (
            <MenuItem key={item.title} className={css.menuItem} onClick={item.onClick}>
              <Icon name={item.iconName} fontSize={16} className="text-Gray-light-mode-700" />
              <span>{item.title}</span>
            </MenuItem>
          ))}
          {connectionStatus !== 'BLOCKED' && (
            <MenuItem key="block" className={`${css.menuItem} ${css.borderedMenuItem}`} onClick={handleBlock}>
              <Icon name="archive" fontSize={16} className="text-Gray-light-mode-700" />
              <span>Block</span>
            </MenuItem>
          )}
        </MenuList>
      )}
    </div>
  );
};
