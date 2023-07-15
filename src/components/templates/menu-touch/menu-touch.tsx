import { Outlet, useNavigate, useRouter } from '@tanstack/react-location';
import { hapticsImpactLight } from '../../../core/haptic/haptic';
import css from './menu-touch.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { IdentityReq } from 'src/core/types';
import { Menu, menuList } from '../menu-cursor/menu-cursor.services';

export const MenuTouch = (): JSX.Element => {
  const navigate = useNavigate();
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
