import { MenuItem, MenuList } from '@mui/material';
import React, { useRef } from 'react';
import useDetectOutside from 'src/core/hooks/detectOutside';
import { Icon } from 'src/Nowruz/general/Icon';

import css from './index.module.scss';
import { ThreeDotsMenuProps } from './index.types';

const ThreeDotsMenu: React.FC<ThreeDotsMenuProps> = ({ open, handleClose, menuItems }) => {
  const ref = useRef<HTMLUListElement>(null);
  useDetectOutside(ref, handleClose);

  return (
    open && (
      <MenuList autoFocusItem className={css.menuList} ref={ref}>
        {menuItems.map(item => (
          <MenuItem key={item.title} className={css.menuItem} onClick={item.onClick}>
            <Icon name={item.iconName} fontSize={16} className="text-Gray-light-mode-700" />
            <span>{item.title}</span>
          </MenuItem>
        ))}
      </MenuList>
    )
  );
};

export default ThreeDotsMenu;
