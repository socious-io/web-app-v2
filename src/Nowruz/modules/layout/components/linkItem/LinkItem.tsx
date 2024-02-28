import { MenuItem, Typography } from '@mui/material';
import React from 'react';
import { Icon } from 'src/Nowruz/general/Icon';

import css from './linkItem.module.scss';
import { LinkItemProps } from './linkItem.types';

export const LinkItem: React.FC<LinkItemProps> = (props) => {
  const { children, iconName, label, navigateFunc, badgeIcon, menuOpen, subMenuOpen } = props;

  return (
    <>
      <MenuItem className={css.container} tabIndex={1}>
        {iconName && (
          <Icon name={iconName} fontSize={24} className="text-Gray-light-mode-500 md:text-Brand-300 !cursor-pointer" />
        )}
        {menuOpen && (
          <>
            <span className={css.itemLabel} onClick={navigateFunc}>
              {label}
            </span>
            {badgeIcon && menuOpen ? <div className="mr-0 ml-auto cursor-pointer">{badgeIcon}</div> : ''}
          </>
        )}
      </MenuItem>
      {menuOpen &&
        subMenuOpen &&
        children?.map((item) => (
          <MenuItem key={item.label} className={`${css.container} pl-11`} tabIndex={1}>
            <Typography variant="h4" className={css.itemLabel} onClick={item.navigateFunc}>
              {item.label}
            </Typography>
          </MenuItem>
        ))}
    </>
  );
};
