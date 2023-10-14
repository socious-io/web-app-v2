import { useNavigate } from 'react-router-dom';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { Card } from 'src/components/atoms/card/card';
import { NotificationList } from 'src/components/organisms/notification-list/notification-list';
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { useAuth } from 'src/hooks/use-auth';

import css from './desktop.module.scss';
import { useNotificationsShared } from '../notifications.shared';

export const Desktop = (): JSX.Element => {
  const navigate = useNavigate();
  const { notificationList, identity, avatarImg, onMorePageClick, onShowSeeMore } = useNotificationsShared();
  const { isLoggedIn } = useAuth();
  return (
    <TwoColumnCursor visibleSidebar={isLoggedIn}>
      <Card className={css.rightContainer}>
        <div className={css.avatar}>
          {identity && <Avatar size="2.25rem" type={identity.type} img={avatarImg} />}
          Notifications
        </div>
        <img src="/icons/settings-black.svg" className={css.icon} onClick={() => navigate('settings')} alt="" />
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
