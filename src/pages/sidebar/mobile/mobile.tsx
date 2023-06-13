import { useNavigate } from '@tanstack/react-location';
import { CSSProperties } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIdentities } from '../../../core/api';
import { IdentityReq } from '../../../core/types';
import { setIdentityList } from '../../../store/reducers/identity.reducer';
import { visibility } from '../../../store/reducers/menu.reducer';
import { RootState } from '../../../store/store';
import { Avatar } from '../../../components/atoms/avatar/avatar';
import { Button } from '../../../components/atoms/button/button';
import { ProfileView } from '../../../components/molecules/profile-view/profile-view';
import { setIdentityHeader, logout } from '../sidebar.service';
import css from './mobile.module.scss';
import { AccountsModel } from './mobile.types';
import { printWhen } from '../../../core/utils';
import { hapticsImpactLight } from '../../../core/haptic/haptic';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';

export const Mobile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });

  const avatarImg = identity?.meta?.avatar || identity?.meta?.image;
  const avatarType = identity?.type;

  const isVisible = useSelector<RootState, boolean>((state) => {
    return state.menu;
  });

  const accountList = useSelector<RootState, AccountsModel[]>((state) => {
    return state.identity.entities.map((item) => {
      return {
        name: item.meta.name,
        image: item.meta.image,
        type: item.type,
        id: item.id,
        current: item.current,
      };
    });
  });

  const closeSidebar = () => {
    dispatch(visibility(false));
  };

  const switchAccount = async (id: string) => {
    hapticsImpactLight();
    await setIdentityHeader(id);
    getIdentities()
      .then((resp) => dispatch(setIdentityList(resp)))
      .then(() => navigate({ to: '/jobs' }))
      .then(closeSidebar);
  };

  const navigateToCreateOrg = () => {
    hapticsImpactLight();
    navigate({ to: `/organization/create/intro` });
    closeSidebar();
  };

  function navigateToProfile() {
    hapticsImpactLight();
    if (identity.type === 'users') {
      navigate({ to: `/profile/users/${identity.meta.username}/view` });
    } else {
      navigate({ to: `/profile/organizations/${identity.meta.shortname}/view` });
    }
    closeSidebar();
  }

  function navigateToSignIn() {
    hapticsImpactLight();
    logout()
      .then(() => navigate({ to: '/sign-in' }))
      .then(closeSidebar)
      .then(() => nonPermanentStorage.clear());
  }

  function sidebarStyles(isVisible: boolean): CSSProperties {
    if (isVisible) {
      return {
        transform: 'translateX(0%)',
      };
    }
    return {
      transform: 'translateX(-100%)',
    };
  }

  function bgStyles(isVisible: boolean): CSSProperties {
    if (isVisible) {
      return {
        opacity: 1,
        visibility: 'visible',
      };
    }
    return {
      opacity: 0,
      visibility: 'hidden',
      width: 0,
    };
  }

  function navigateToCreatedJobs() {
    hapticsImpactLight();
    navigate({ to: `/m/jobs/created/${identity.id}` });
    closeSidebar();
  }

  const navigateToRoute = (route: string) => {
    hapticsImpactLight();
    navigate({ to: `../${route}` });
    closeSidebar();
  };

  function navigateToAppliedApplications() {
    hapticsImpactLight();
    navigate({ to: `/m/jobs/applied/${identity.id}` });
    closeSidebar();
  }

  const createdLinkJSX = (
    <div onClick={navigateToCreatedJobs} className={css.row}>
      <img src="/icons/folder-black.svg" />
      <span>Created</span>
    </div>
  );

  const myApplicationsJSX = (
    <div onClick={navigateToAppliedApplications} className={css.row}>
      <img src="/icons/document-black.svg" />
      <span>My applications</span>
    </div>
  );

  function filterCurrentIdentity(acc: AccountsModel) {
    return !acc.current;
  }

  const switchToJSX = (
    <div className={css.items}>
      <div className={css.title}>Switch To</div>
      {accountList.filter(filterCurrentIdentity).map((item) => {
        return (
          <div
            onClick={() => {
              switchAccount(item.id);
            }}
            key={item.id}
            className={css.row}
          >
            <Avatar size="2rem" type={item.type} img={item.image} />
            <span>{item.name}</span>
          </div>
        );
      })}
    </div>
  );

  const paymentJSX = (
    <div className={css.items}>
      <div className={css.title}>Billing & Payments</div>
      <div className={css.row} onClick={() => navigateToRoute('wallet')}>
        <img src="/icons/wallet.svg" />
        <span>Wallet</span>
      </div>
    </div>
  );

  return (
    <div className={css.container}>
      <div style={bgStyles(isVisible)} className={css.bg} onClick={closeSidebar} />
      <div style={sidebarStyles(isVisible)} className={css.sidebar}>
        <div className={css.header}>
          <div className={css.organization}>
            <Button onClick={navigateToCreateOrg} color="white" width="160px">
              Add organization
            </Button>
            <div className={css.dotIcon}>
              <img src="/icons/three-dots-blue.svg" alt="" />
            </div>
          </div>
          <div className={css.info}>
            <ProfileView
              name={identity?.meta?.name}
              location={
                <div className={css.profileLink} onClick={navigateToProfile}>
                  View my profile
                </div>
              }
              size="3rem"
              type={avatarType}
              img={avatarImg}
            />
          </div>
          <div className={css.connections}>
            {/* <span>4 Connections</span>
            <span>11 Followers</span> */}
          </div>
        </div>
        <div className={css.items}>
          <div className={css.title}>Jobs</div>
          {printWhen(myApplicationsJSX, identity?.type === 'users')}
          {printWhen(createdLinkJSX, identity?.type === 'organizations')}
        </div>
        {printWhen(switchToJSX, accountList.length > 1)}
        {printWhen(paymentJSX, identity?.type === 'users')}
        <div className={css.items}>
          <div className={css.title}>Settings</div>
          <div className={css.row} onClick={() => navigateToRoute('privacy-policy')}>
            <img src="/icons/document-one-black.svg" />
            <span>Privacy policy</span>
          </div>
          <div className={css.row} onClick={() => navigateToRoute('terms-conditions')}>
            <img src="/icons/document-one-black.svg" />
            <span>Terms & conditions</span>
          </div>
          <div className={css.row} onClick={() => navigateToRoute('change-password')}>
            <img src="/icons/key-black.svg" width={22} height={22} />
            <span>Change password</span>
          </div>
          <div className={css.row} onClick={() => navigateToRoute('delete-profile/delete')}>
            <img src="/icons/delete-account-black.svg" />
            <span>Delete Account</span>
          </div>
        </div>
        <div className={css.items}>
          <div className={css.row} onClick={() => navigateToSignIn()}>
            <img src="/icons/logout-red.svg" height={22} className={css.redIcon} />
            <span>Log out</span>
          </div>
        </div>
      </div>
    </div>
  );
};
