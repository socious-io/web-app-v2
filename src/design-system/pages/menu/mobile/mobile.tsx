import { useNavigate } from '@tanstack/react-location';
import { CSSProperties } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIdentities } from '../../../../core/api';
import { IdentityReq } from '../../../../core/types';
import { setIdentityList } from '../../../../store/reducers/identity.reducer';
import { visibility } from '../../../../store/reducers/menu.reducer';
import { RootState } from '../../../../store/store';
import { Avatar } from '../../../atoms/avatar/avatar';
import { Button } from '../../../atoms/button/button';
import { getSession } from '../menu.service';
import css from './mobile.module.scss';
import { AccountsModel } from './mobile.types';

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
      };
    });
  });

  const closePage = () => {
    dispatch(visibility(false));
  };

  const navigateToJobs = (id: string) => {
    getSession(id).then((resp) => {
      if (resp.message === 'success') {
        getIdentities()
          .then((resp) => dispatch(setIdentityList(resp)))
          .then(() => navigate({ to: '/jobs' }))
          .then(closePage);
      }
    });
  };

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

  return (
    <div className={css.container}>
      <div style={bgStyles(isVisible)} className={css.bg} onClick={closePage} />
      <div style={sidebarStyles(isVisible)} className={css.sidebar}>
        <div className={css.header}>
          <div className={css.organization}>
            <Button color="white" width="160px">
              Add organization
            </Button>
            <div className={css.dotIcon}>
              <img src="/icons/three-dots-blue.svg" alt="" />
            </div>
          </div>
          <div className={css.info}>
            <Avatar size="3rem" type={avatarType} img={avatarImg} />
            <div className={css.nameInfo}>
              <span className={css.fullname}>Azin Zare</span>
              <span className={css.profile}>view my profile</span>
            </div>
          </div>
          <div className={css.connections}>
            <span>4 Connections</span>
            <span>11 Followers</span>
          </div>
        </div>
        <div className={css.items}>
          <div className={css.title}>Jobs</div>
          <div className={css.row}>
            <img src="/icons/document-black.svg" />
            <span>My applications</span>
          </div>
          <div className={css.row}>
            <img src="/icons/folder-black.svg" />
            <span>Hired jobs</span>
          </div>
        </div>
        <div className={css.items}>
          <div className={css.title}>Switch To</div>
          {accountList.map((item) => (
            <div onClick={() => navigateToJobs(item.id)} key={item.id} className={css.row}>
              <Avatar size="2rem" type={item.type} img={item.image} />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
        <div className={css.items}>
          <div className={css.title}>Settings</div>
          <div className={css.row}>
            <img src="/icons/document-black.svg" />
            <span>Privacy policy</span>
          </div>
          <div className={css.row}>
            <img src="/icons/folder-black.svg" />
            <span>Terms & conditions</span>
          </div>
          <div className={css.row}>
            <img src="/icons/folder-black.svg" />
            <span>Change password</span>
          </div>
          <div className={css.row}>
            <img src="/icons/folder-black.svg" />
            <span>Delete Account</span>
          </div>
        </div>
        <div className={css.items}>
          <div className={css.row}>
            <img src="/icons/document-black.svg" />
            <span className={css.redText}>Log out</span>
          </div>
        </div>
      </div>
    </div>
  );
};
