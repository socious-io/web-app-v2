import { Outlet } from '@tanstack/react-location';
import { Avatar } from '../../atoms/avatar/avatar';
import css from './menu-cursor.module.scss';
import { getAvatar, menuList } from './menu-cursor.services';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { IdentityReq } from 'src/core/types';

export const MenuCursor = (): JSX.Element => {
  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });

  console.log('identity: ', identity);

  return (
    <div className={css.container}>
      <div className={css.menu}>
        <div className={css.menuItems}>
          <div className={css.logo}>
            <img height={32} src="icons/logo-white.svg" />
          </div>
          <ul className={css.navContainer}>
            {menuList.map((item) => (
              <li key={item.label} className={css.navItem}>
                <img className={css.navIcon} height={24} src={item.icon} />
                <div className={css.navLabel}>{item.label}</div>
              </li>
            ))}
          </ul>
          <Avatar size="2rem" type={identity.type} img={getAvatar(identity)} />
        </div>
      </div>
      <div className={css.body}>
        <Outlet />
      </div>
    </div>
  );
};
