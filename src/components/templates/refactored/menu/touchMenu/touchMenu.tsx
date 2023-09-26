import React from 'react';
import { useSelector } from 'react-redux';
import { hapticsImpactLight } from 'src/core/haptic/haptic';
import { IdentityReq } from 'src/core/types';
import { RootState } from 'src/store/store';

import css from './touchMenu.module.scss';
import { Menu, menuList } from '../menu.services';


const TouchMenu = () => {
  const navigate = {};
  const { state } = useRouter();

  const currentIdentity = useSelector<RootState, IdentityReq | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });

  function isActive(route: string): boolean {
    return state.location.pathname === route;
  }

  function onMenuClick(item: Menu) {
    return () => {
      navigate({ to: item.link });
      hapticsImpactLight();
    };
  }

  function filterIfNotLoggedIn(item: Menu) {
    const userIsLoggedIn = !!currentIdentity;

    if (userIsLoggedIn || item.public) {
      return item;
    }
  }
  return (
    <div className={css.container}>
      <div className={css.navContainer}>
        {menuList.filter(filterIfNotLoggedIn).map((item) => (
          <li onClick={onMenuClick(item)} key={item.label} className={css.navItem}>
            <img
              className={css.navIcon}
              height={24}
              src={isActive(item.link) ? item.icons.active.mobile : item.icons.nonActive.mobile}
            />
            <div style={{ color: isActive(item.link) ? 'var(--color-primary-01)' : '' }} className={css.navLabel}>
              {item.label}
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default TouchMenu;
