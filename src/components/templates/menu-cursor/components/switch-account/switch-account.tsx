import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'src/components/atoms/button/button';
import { ProfileView } from 'src/components/molecules/profile-view/profile-view';
import { Divider } from 'src/components/templates/divider/divider';
import { identities } from 'src/core/api';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import { printWhen } from 'src/core/utils';
import { useAuth } from 'src/hooks/use-auth';
import { AccountsModel } from 'src/pages/sidebar/mobile/mobile.types';
import { logout, setIdentityHeader } from 'src/pages/sidebar/sidebar.service';
import { setIdentityList } from 'src/store/reducers/identity.reducer';
import { RootState } from 'src/store/store';

import css from './switch-account.module.scss';
import { SwitchAccountProps } from './switch-account.types';
import { ChangePasswordModal } from '../change-password-modal/change-password-modal';
import { useNavigate } from 'react-router-dom';

let timer: NodeJS.Timeout;

export const SwitchAccount = (props: SwitchAccountProps): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pendingAccId, setPendingAccId] = useState('');
  const [changePassOpen, setChangePassOpen] = useState(false);
  const [containerStyles, setContainerStyle] = useState<CSSProperties>({});
  const { isLoggedIn } = useAuth();
  const accountList = useSelector<RootState, AccountsModel[]>((state) => {
    return state.identity.entities.map((item) => ({
      name: item.meta.name,
      image: item.meta.image,
      avatar: item?.meta?.avatar,
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
    logout().then(() => navigate('/sign-in'));
    props.onClose();
    nonPermanentStorage.clear();
  }

  function login() {
    navigate('/sign-in');
    props.onClose();
  }

  useEffect(() => {
    props.open ? openMenu() : closeMenu();
    return () => clearTimeout(timer);
  }, [props.open]);

  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        props.onClose();
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  const switchAccount = async (id: string) => {
    setPendingAccId(id);
    await setIdentityHeader(id);
    identities()
      .then((resp) => dispatch(setIdentityList(resp)))
      .then(() => navigate('/jobs'))
      .then(closeMenu);
  };

  function accountBgColor(id: string, current: boolean) {
    if (current) {
      return 'var(--color-primary-01)';
    }
    if (id === pendingAccId) {
      return '#004a4618';
    }
  }

  const navigateToRoute = (route: string) => {
    navigate(route);
    closeMenu();
  };

  const createdJobDividerJSX = (
    <Divider title="Jobs">
      <div className={css.settingsMenuContainer}>
        <div onClick={() => navigateToRoute(`/d/jobs/created/${props.identity.id}`)} className={css.menuItem}>
          <img src="/icons/folder-black.svg" />
          <span>Created</span>
        </div>
      </div>
    </Divider>
  );

  const myApplicationsJSX = (
    <Divider title="Jobs">
      <div className={css.settingsMenuContainer}>
        <div onClick={() => navigateToRoute(`/d/jobs/applied/${props.identity.id}`)} className={css.menuItem}>
          <img src="/icons/document-black.svg" />
          <span>My applications</span>
        </div>
      </div>
    </Divider>
  );

  const paymentJSX = (
    <Divider title="Billing & Payments">
      <div className={css.settingsMenuContainer}>
        <div onClick={() => navigateToRoute('/wallet')} className={css.menuItem}>
          <img src="/icons/wallet.svg" />
          <span>Wallet</span>
        </div>
      </div>
    </Divider>
  );

  const headerJSX = (
    <Divider padding={0}>
      <div className={css.accountList}>
        <Button
          onClick={() => navigateToRoute('/organization/create/intro')}
          color="white"
          width="160px"
          className={css.accountList__btn}
        >
          Add organization
        </Button>
        {accountList.filter(filterCurrentIdentity).map((item) => {
          return (
            <div
              onClick={() => switchAccount(item.id)}
              key={item.id}
              style={{ backgroundColor: accountBgColor(item.id, item.current) }}
              className={css.accountItem}
            >
              <ProfileView
                type={item.type}
                name={item.name}
                img={item.type === 'organizations' ? item.image : item?.avatar}
                theme={item.current ? 'dark' : 'light'}
              />
            </div>
          );
        })}
      </div>
    </Divider>
  );

  function filterCurrentIdentity(acc: AccountsModel) {
    return !acc.current;
  }

  return (
    <div ref={ref} style={containerStyles} className={css.container}>
      {printWhen(headerJSX, isLoggedIn)}
      {printWhen(myApplicationsJSX, props.identity && props.identity.type === 'users')}
      {printWhen(createdJobDividerJSX, props.identity && props.identity.type === 'organizations')}
      {printWhen(paymentJSX, props.identity && props.identity.type === 'users')}
      <Divider title="Settings">
        <div className={css.settingsMenuContainer}>
          <div className={css.menuItem} onClick={() => navigateToRoute('/privacy-policy')}>
            <img src="/icons/document-one-black.svg" />
            <span>Privacy policy</span>
          </div>
          <div className={css.menuItem} onClick={() => navigateToRoute('/terms-conditions')}>
            <img src="/icons/document-one-black.svg" />
            <span>Terms & conditions</span>
          </div>
          {printWhen(
            <div
              className={css.menuItem}
              onClick={() => {
                closeMenu();
                setChangePassOpen(true);
              }}
            >
              <img src="/icons/key-black.svg" width={22} height={22} />
              <span>Change password</span>
            </div>,
            isLoggedIn,
          )}
          {printWhen(
            <div className={css.menuItem} onClick={() => navigateToRoute('/delete-profile/delete')}>
              <img src="/icons/delete-account-black.svg" />
              <span>Delete Account</span>
            </div>,
            isLoggedIn,
          )}
        </div>
      </Divider>
      {printWhen(
        <Divider>
          <div className={css.settingsMenuContainer}>
            <div onClick={logOut} className={css.menuItem}>
              <img src="/icons/logout-red.svg" height={22} />
              <span>Log out</span>
            </div>
          </div>
        </Divider>,
        isLoggedIn,
      )}
      {printWhen(
        <Divider>
          <div className={css.settingsMenuContainer}>
            <div onClick={login} className={css.menuItem}>
              <img src="/icons/logout-red.svg" height={22} />
              <span>Sign in</span>
            </div>
          </div>
        </Divider>,
        !isLoggedIn,
      )}
      <ChangePasswordModal open={changePassOpen} onClose={() => setChangePassOpen(false)} />
    </div>
  );
};
