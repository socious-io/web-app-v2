import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { Notification } from 'src/core/api';
import { toRelativeTime } from 'src/core/relative-time';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { Dot } from 'src/Nowruz/modules/general/components/dot';

import css from './notificationItem.module.scss';

interface NotificationItemProps {
  item: Notification;
  onClick: () => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({ item, onClick }) => {
  const avatarImg = item.data.identity.meta.avatar || item.data.identity.meta.image || '';
  return (
    <div className="flex gap-3 w-full h-fit items-start cursor-pointer" onClick={onClick}>
      <Avatar size="48px" img={avatarImg} type={item.data.identity?.type || 'users'} />
      <div className="w-full h-fit flex flex-col">
        <div className="flex gap-2">
          <p className={css.name}>{item.data.identity.meta.name}</p>
          <p className={css.time}>{toRelativeTime(item.created_at.toString())}</p>
        </div>
        <p className={css.message}>{item.data.body.body?.toString() || ''}</p>
      </div>
      {!item.read_at && (
        <div className="w-fit h-fit mr-0 ml-auto">
          <Dot size="small" color={variables.color_success_500} shadow={false} />
        </div>
      )}
    </div>
  );
};
