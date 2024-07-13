import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { Notification } from 'src/core/api';
import { toRelativeTime } from 'src/core/relative-time';
import { Avatar } from 'src/modules/general/components/avatar/avatar';
import { Dot } from 'src/modules/general/components/dot';
import { Link } from 'src/modules/general/components/link';

import css from './notificationItem.module.scss';

interface NotificationItemProps {
  item: Notification;
  onClick: () => void;
  hasSubText?: boolean;
  linkButton?: { label: string; href: string } | null;
  identity?: { name: string; avatar: string } | null;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  item,
  onClick,
  hasSubText = false,
  linkButton = null,
  identity = null,
}) => {
  const avatarImg = identity?.avatar || item.data?.identity.meta?.avatar || item.data?.identity.meta?.image || '';
  const name = identity?.name || item.data.identity.meta?.name;
  const notifBody = item.data.body.body?.toString() || '';
  const notifText = notifBody.startsWith(name) ? notifBody.replace(name, '') : notifBody;
  const notifSubText = hasSubText ? item.data.body.title : '';

  return (
    <div className="flex gap-3 w-full h-fit items-start cursor-pointer" onClick={onClick}>
      <Avatar size="48px" img={avatarImg} type={item.data.identity?.type || 'users'} />
      <div className="w-full h-fit flex flex-col">
        <div className="flex gap-2">
          <p className={css.name}>{name}</p>
          <p className={css.time}>{toRelativeTime(item.created_at.toString())}</p>
        </div>
        <p className={css.message}>
          {notifText}
          {notifSubText && <span className={css.message}> {notifSubText}</span>}
        </p>
        {!!linkButton && <Link color="primary" label={linkButton.label} href={linkButton.href} customStyle="mt-3" />}
      </div>
      {!item.read_at && (
        <div className="w-fit h-fit mr-0 ml-auto">
          <Dot size="small" color={variables.color_success_500} shadow={false} />
        </div>
      )}
    </div>
  );
};
