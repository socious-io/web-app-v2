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
import { SwitchAccountProps } from './switch-account.types';
import { ChangePasswordModal } from '../change-password-modal/change-password-modal';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import { printWhen } from 'src/core/utils';
import { Button } from 'src/components/atoms/button/button';

let timer: NodeJS.Timeout;

export const SwitchAccount = (props: SwitchAccountProps): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pendingAccId, setPendingAccId] = useState('');
  const [changePassOpen, setChangePassOpen] = useState(false);
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
    nonPermanentStorage.clear();
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

  const navigateToRoute = (route: string) => {
    navigate({ to: route });
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

  function filterCurrentIdentity(acc: AccountsModel) {
    return !acc.current;
  }

  return (
    <div style={containerStyles} className={css.container}>
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
          {accountList.filter(filterCurrentIdentity).map((item) => (
            <div
              onClick={() => switchAccount(item.id)}
              key={item.id}
              style={{ backgroundColor: accountBgColor(item.id, item.current) }}
              className={css.accountItem}
            >
              <ProfileView type={item.type} name={item.name} img={item.image} theme={item.current ? 'dark' : 'light'} />
            </div>
          ))}
        </div>
      </Divider>
      {printWhen(myApplicationsJSX, props.identity.type === 'users')}
      {printWhen(createdJobDividerJSX, props.identity.type === 'organizations')}
      {printWhen(paymentJSX, props.identity.type === 'users')}
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
          <div
            className={css.menuItem}
            onClick={() => {
              closeMenu();
              setChangePassOpen(true);
            }}
          >
            <img src="/icons/key-black.svg" width={22} height={22} />
            <span>Change password</span>
          </div>
          <div className={css.menuItem} onClick={() => navigateToRoute('/delete-profile/delete')}>
            <img src="/icons/delete-account-black.svg" />
            <span>Delete Account</span>
          </div>
        </div>
      </Divider>
      <Divider>
        <div className={css.settingsMenuContainer}>
          <div onClick={logOut} className={css.menuItem}>
            <img src="/icons/logout-red.svg" height={22} />
            <span>Log out</span>
          </div>
        </div>
      </Divider>
      <ChangePasswordModal open={changePassOpen} onClose={() => setChangePassOpen(false)} />
    </div>
  );
};
