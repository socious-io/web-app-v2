import css from './mobile.module.scss';
import { useNavigate } from '@tanstack/react-location';
import { NotificationMobileProps } from './mobile.types';
import { NotificationList } from '../../../components/organisms/notification-list/notification-list';
import { useState } from 'react';
import { getNotificationList } from './mobile.service';
import { Avatar } from '../../../components/atoms/avatar/avatar';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { IdentityReq } from '../../../core/types';

export const Mobile = ({ list }: NotificationMobileProps): JSX.Element => {
  const navigate = useNavigate();
  const [notificationList, setNotificationList] = useState(list.items);
  const [page, setPage] = useState(1);
  const totalCount = list.total_count;

  const onShowSeeMore = (length: number): boolean => {
    if (length < totalCount) {
      return true;
    }
    return false;
  };

  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });

  const avatarImg = identity?.meta?.avatar || identity?.meta?.image;

  const onMorePageClick = () => {
    getNotificationList({ page: page + 1 }).then((resp) => {
      setPage((v) => v + 1);
      setNotificationList((list) => [...list, ...resp.items]);
    });
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <Avatar size="2.25rem" type={identity.type} img={avatarImg} />
        <span className={css.title}>Notifications</span>
        <img src="/icons/settings-black.svg" onClick={() => navigate({ to: 'settings' })} />
      </div>
      <div className={css.main}>
        <NotificationList
          onMorePageClick={onMorePageClick}
          list={notificationList}
          showSeeMore={onShowSeeMore(notificationList.length)}
        />
      </div>
    </div>
  );
};
