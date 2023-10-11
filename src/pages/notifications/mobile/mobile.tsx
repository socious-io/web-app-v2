import { useNavigate } from 'react-router-dom';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { NotificationList } from 'src/components/organisms/notification-list/notification-list';
import { useNotificationsShared } from 'src/pages/notifications/notifications.shared';

import css from './mobile.module.scss';

export const Mobile: React.FC = () => {
  const navigate = useNavigate();
  const { notificationList, identity, avatarImg, onMorePageClick, onShowSeeMore } = useNotificationsShared();

  return (
    <div className={css.container}>
      <div className={css.header}>
        {identity && <Avatar size="2.25rem" type={identity.type} img={avatarImg} />}
        <span className={css.title}>Notifications</span>
        <img src="/icons/settings-black.svg" onClick={() => navigate('settings')} alt="" />
      </div>
      <div className={css.main}>
        <NotificationList
          onMorePageClick={onMorePageClick}
          list={notificationList}
          showSeeMore={onShowSeeMore(notificationList.length)}
          route="m"
        />
      </div>
    </div>
  );
};
