import css from './switch-account.module.scss';
import { RootState } from 'src/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { AccountsModel } from 'src/pages/sidebar/mobile/mobile.types';
import { ProfileView } from 'src/components/molecules/profile-view/profile-view';
import { logout, setIdentityHeader } from 'src/pages/sidebar/sidebar.service';
import { getIdentities } from 'src/core/api';
import { setIdentityList } from 'src/store/reducers/identity.reducer';
import { useNavigate } from '@tanstack/react-location';
import { CSSProperties, useCallback, useEffect, useState } from 'react';
import { Divider } from 'src/components/templates/divider/divider';
import { settingsList } from '../../menu-cursor.services';
import { SwitchAccountProps } from './switch-account.types';

let timer: NodeJS.Timeout;

export const SwitchAccount = (props: SwitchAccountProps): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pendingAccId, setPendingAccId] = useState('');
  const [containerStyles, setContainerStyle] = useState<CSSProperties>({});
  const accountList = useSelector<RootState, AccountsModel[]>((state) => {
    return state.identity.entities.map((item) => ({
      name: item.meta.name,
      image: item.meta.image,
      type: item.type,
      id: item.id,
      current: item.current,
    }));
  });

  const openMenu = useCallback(() => {
    setContainerStyle((style) => ({ ...style, display: 'block' }));
    timer = setTimeout(() => {
      setContainerStyle({
        display: 'block',
        opacity: 1,
        transform: 'translateY(0%)',
      });
    }, 50);
  }, []);

  const closeMenu = useCallback(() => {
    setContainerStyle({ opacity: 0, transform: 'translateY(1rem)' });
    timer = setTimeout(() => {
      setContainerStyle((style) => ({ ...style, display: 'none' }));
      props.onClose();
    }, 180);
  }, []);

  function logOut() {
    logout().then(() => navigate({ to: '/sign-in' }));
    props.onClose();
  }

  useEffect(() => {
    props.open ? openMenu() : closeMenu();
    return () => clearTimeout(timer);
  }, [props.open]);

  const switchAccount = async (id: string) => {
    setPendingAccId(id);
    await setIdentityHeader(id);
    getIdentities()
      .then((resp) => dispatch(setIdentityList(resp)))
      .then(() => navigate({ to: '/jobs' }))
      .then(closeMenu);
  };

  function accountBgColor(id: string, current: Boolean) {
    if (current) {
      return 'var(--color-primary-01)';
    }
    if (id === pendingAccId) {
      return '#004a4618';
    }
  }

  return (
    <div style={containerStyles} className={css.container}>
      <Divider padding={0}>
        <div className={css.accountList}>
          {accountList
            .filter((_, i) => i < 3)
            .map((item) => (
              <div
                onClick={() => switchAccount(item.id)}
                key={item.id}
                style={{ backgroundColor: accountBgColor(item.id, item.current) }}
                className={css.accountItem}
              >
                <ProfileView
                  type={item.type}
                  name={item.name}
                  img={item.image}
                  theme={item.current ? 'dark' : 'light'}
                />
              </div>
            ))}
        </div>
      </Divider>
      <Divider title="Jobs">
        <div className={css.settingsMenuContainer}>
          <div className={css.menuItem}>
            <span>Created</span>
          </div>
        </div>
      </Divider>
      <Divider title="Settings">
        <div className={css.settingsMenuContainer}>
          {settingsList.map((item) => {
            return (
              <div key={item.label} className={css.menuItem}>
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </Divider>
      <Divider>
        <div className={css.settingsMenuContainer}>
          <div onClick={logOut} className={css.menuItem}>
            <span>Log out</span>
          </div>
        </div>
      </Divider>
    </div>
  );
};
