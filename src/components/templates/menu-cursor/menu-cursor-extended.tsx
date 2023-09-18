import css from './menu-cursor.module.scss';
import { Outlet, useLocation } from '@tanstack/react-location';
import { Avatar } from '../../atoms/avatar/avatar';
import { Menu, getAvatar, menuList } from './menu-cursor.services';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { IdentityReq } from 'src/core/types';
import { SwitchAccount } from './components/switch-account/switch-account';
import { CSSProperties, useState } from 'react';
import { useNavigate } from '@tanstack/react-location';
import { Search } from 'src/components/atoms/search/search';
import { PayloadModel } from 'src/pages/search/desktop/search.types';
import { printWhen } from 'src/core/utils';

type Props = {
  children: JSX.Element[];
};

export const MenuCursorExtended = ({ children }: Props): JSX.Element => {
  const navigate = useNavigate();
  const route = useLocation();
  const currentIdentity = useSelector<RootState, IdentityReq | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });

  const [accListVisibility, setAccListVisibility] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const userIsLoggedIn = !!currentIdentity;

  function navigateToSearch(q: string) {
    navigate({
      to: '/d/search',
      search: (p: PayloadModel) => {
        const type = p.type ?? 'projects';
        const page = p.page ?? 1;
        return { type, q, page };
      },
    });
  }

  function onMenuItemClick(menu: Menu) {
    if (route.current.pathname !== menu.link) {
      setSearchValue('');
    }
    navigate({ to: menu.link });
  }

  function filterIfNotLoggedIn(item: Menu) {
    if (userIsLoggedIn || item.public) {
      return item;
    }
  }

  const mainStyle: CSSProperties = {
    maxWidth: userIsLoggedIn ? '38.5rem' : undefined,
  };

  return (
    <div className={css.container}>
      <div className={css.menu}>
        <div className={css.menuItems}>
          <div className={css.logo} onClick={() => navigate({ to: '/jobs' })}>
            <img style={{ minWidth: 32 }} height={32} src="/icons/logo-white.svg" />
          </div>
          <Search
            onEnter={navigateToSearch}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            marginRight="auto"
            placeholder="Search"
          />
          <ul className={css.navContainer}>
            {menuList.filter(filterIfNotLoggedIn).map((item) => (
              <li key={item.label} className={css.navItem} onClick={() => onMenuItemClick(item)}>
                <img className={css.navIcon} height={24} src={item.icons.nonActive.desktop} />
                <div className={css.navLabel}>{item.label}</div>
              </li>
            ))}
          </ul>
          <div className={css.avatar}>
            <Avatar
              onClick={() => {
                setAccListVisibility(!accListVisibility);
              }}
              size="2rem"
              type={currentIdentity?.type || 'users'}
              img={getAvatar(currentIdentity)}
            />
            <div className={css.switchAccountMenu}>
              <SwitchAccount
                identity={currentIdentity}
                open={accListVisibility}
                onClose={() => setAccListVisibility(false)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={css.body}>
        <div className="flex justify-center bg-color-off-white-01 min-h-[calc(100vh-4rem)]">
          <div className="w-124 mt-10 mr-10 mb-0 ml-10 flex justify-center gap-6 pb-8">
            {printWhen(<div className="w-80">{children[0]}</div>, userIsLoggedIn)}
            <div style={mainStyle} className="w-max">
              {children[1]}
            </div>
          </div>
        </div>

        {/* <Outlet /> */}
      </div>
    </div>
  );
};
