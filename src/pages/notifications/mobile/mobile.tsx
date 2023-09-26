import css from './mobile.module.scss';
import { Avatar } from '../../../components/atoms/avatar/avatar';
import { NotificationList } from '../../../components/organisms/notification-list/notification-list';
import { useNotificationsShared } from '../notifications.shared';

export const Mobile: React.FC = () => {
  const navigate = {};
  const { notificationList, identity, avatarImg, onMorePageClick, onShowSeeMore } = useNotificationsShared();

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
          route="m"
        />
      </div>
    </div>
  );
};
