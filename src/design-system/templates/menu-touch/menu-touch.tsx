import { Outlet } from '@tanstack/react-location';
import css from './menu-touch.module.scss';
import { menuList } from './menu-touch.services';

export const MenuTouch = (): JSX.Element => {
  return (
    <div className={css.container}>
      <div className={css.body}>
        <Outlet />
      </div>
      <div className={css.menu}>
        <div className={css.navContainer}>
          {menuList.map((item) => (
            <li key={item.label} className={css.navItem}>
              <img className={css.navIcon} height={24} src={item.icon} />
              <div className={css.navLabel}>{item.label}</div>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};
