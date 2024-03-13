import { MenuItem, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Icon } from 'src/Nowruz/general/Icon';

import css from './linkItem.module.scss';
import { LinkItemProps } from './linkItem.types';

export const LinkItem: React.FC<LinkItemProps> = (props) => {
  const { children, iconName, label, navigateFunc, badgeIcon, menuOpen } = props;
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [badgeIconVal, setBadgeIconVal] = useState(badgeIcon);
  useEffect(() => {
    if (!children?.length) return;
    if (menuOpen && subMenuOpen)
      setBadgeIconVal(<Icon name="chevron-up" className="text-Brand-300 !cursor-pointer" fontSize={20} />);
    if (menuOpen && !subMenuOpen)
      setBadgeIconVal(<Icon name="chevron-down" className="text-Brand-300 !cursor-pointer" fontSize={20} />);
  }, [subMenuOpen, menuOpen]);

  return (
    <>
      <MenuItem
        className={css.container}
        tabIndex={1}
        onClick={children?.length ? () => setSubMenuOpen(!subMenuOpen) : navigateFunc}
      >
        {iconName && (
          <Icon
            name={iconName}
            fontSize={24}
            className="text-Gray-light-mode-500 md:text-Brand-300 !cursor-pointer"
            style={{ pointerEvents: 'none' }}
          />
        )}
        {menuOpen && (
          <>
            <span className={css.itemLabel} style={{ pointerEvents: 'none' }}>
              {label}
            </span>
            {badgeIconVal && menuOpen ? (
              <div className="mr-0 ml-auto cursor-pointer z-50" style={{ pointerEvents: 'none' }}>
                {badgeIconVal}
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
