import { Outlet, useNavigate, useRouter } from '@tanstack/react-location';
import { hapticsImpactLight } from '../../../core/haptic/haptic';
import css from './menu-touch.module.scss';
import { menuList } from './menu-touch.services';
import { Menu } from './menu-touch.types';

export const MenuTouch = (): JSX.Element => {
  const navigate = useNavigate();
  const { state } = useRouter();

  function isActive(route: string): boolean {
    return state.location.pathname === route;
  }

  function onMenuClick(item: Menu) {
    return () => {
      navigate({ to: item.route });
      hapticsImpactLight();
    };
  }

  return (
    <div className={css.container}>
      <div className={css.body}>
        <Outlet />
      </div>
      <div className={css.menu}>
        <div className={css.navContainer}>
          {menuList.map((item) => (
            <li onClick={onMenuClick(item)} key={item.label} className={css.navItem}>
              <img
                className={css.navIcon}
                height={24}
                src={isActive(item.route) ? `${item.icon}-active.svg` : `${item.icon}.svg`}
              />
              <div style={{ color: isActive(item.route) ? 'var(--color-primary-01)' : '' }} className={css.navLabel}>
                {item.label}
              </div>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};
