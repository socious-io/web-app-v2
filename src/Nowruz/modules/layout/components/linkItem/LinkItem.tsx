import { MenuItem, Typography } from '@mui/material';
import React from 'react';
import { Icon } from 'src/Nowruz/general/Icon';

import css from './linkItem.module.scss';
import { LinkItemProps } from './linkItem.types';

export const LinkItem: React.FC<LinkItemProps> = (props) => {
  const { children, iconName, label, navigateFunc, badgeIcon, menuOpen, subMenuOpen, iconClick } = props;

  return (
    <>
      <MenuItem className={css.container} tabIndex={1} onClick={navigateFunc}>
        {iconName && (
          <Icon
            name={iconName}
            fontSize={24}
            className="text-Gray-light-mode-500 md:text-Brand-300 !cursor-pointer"
            style={{ pointerEvents: 'none' }}
            onClick={iconClick}
          />
        )}
        {menuOpen && (
          <>
            <span className={css.itemLabel} style={{ pointerEvents: 'none' }}>
              {label}
            </span>
            {badgeIcon && menuOpen ? (
              <div className="mr-0 ml-auto cursor-pointer" style={{ pointerEvents: 'none' }}>
                {badgeIcon}
              </div>
            ) : (
              ''
            )}
          </>
        )}
      </MenuItem>
      {menuOpen &&
        subMenuOpen &&
        children?.map((item) => (
          <MenuItem key={item.label} className={`${css.container} pl-11`} tabIndex={1} onClick={item.navigateFunc}>
            <Typography variant="h4" className={css.itemLabel} style={{ pointerEvents: 'none' }}>
              {item.label}
            </Typography>
          </MenuItem>
        ))}
    </>
  );
};
