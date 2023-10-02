import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu, menuList } from 'src/components/templates/menu-cursor/menu-cursor.services';
import { hapticsImpactLight } from 'src/core/haptic/haptic';
import { IdentityReq } from 'src/core/types';
import { RootState } from 'src/store/store';

import css from './menu-touch.module.scss';
import { hapticsImpactLight } from '../../../core/haptic/haptic';
import { Menu, menuList } from '../menu-cursor/menu-cursor.services';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from 'src/pages/sidebar/sidebar';


export const MenuTouch = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentIdentity = useSelector<RootState, IdentityReq | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });

  function isActive(route: string): boolean {
    return location.pathname === route;
  }

  function onMenuClick(item: Menu) {
    return () => {
      navigate(item.link);
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
      <Sidebar />
      <div className={css.body}>
        <Outlet />
      </div>
      <div className={css.menu}>
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
    </div>
  );
};
