import { useNavigate } from '@tanstack/react-location';
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { Card } from 'src/components/atoms/card/card';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { NotificationList } from 'src/components/organisms/notification-list/notification-list';
import { useNotificationsShared } from '../notifications.shared';
import css from './desktop.module.scss';
import { useAuth } from 'src/hooks/use-auth';

export const Desktop = (): JSX.Element => {
  const navigate = useNavigate();
  const { notificationList, identity, avatarImg, onMorePageClick, onShowSeeMore } = useNotificationsShared();
  const { isLoggedIn } = useAuth();

  return (
    <TwoColumnCursor visibleSidebar={isLoggedIn}>
      <Card className={css.rightContainer}>
        <div className={css.avatar}>
          <Avatar size="2.25rem" type={identity.type} img={avatarImg} />
          Notifications
        </div>
        <img src="/icons/settings-black.svg" className={css.icon} onClick={() => navigate({ to: 'settings' })} />
      </Card>
      <Card>
        <NotificationList
          onMorePageClick={onMorePageClick}
          list={notificationList}
          showSeeMore={onShowSeeMore(notificationList.length)}
          route="d"
        />
      </Card>
    </TwoColumnCursor>
  );
};
