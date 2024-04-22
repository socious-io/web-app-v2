import React from 'react';
import { NotificationItem } from 'src/Nowruz/modules/layout/components/NotificationItem';

import { NotificationProps } from './notifications.type';
import { useNotifications } from './useNotifications';

export const Notifications: React.FC<NotificationProps> = ({ handleClose, list }) => {
  const { mapTypeToRoute } = useNotifications();
  return (
    <div className="py-6 w-full h-full flex flex-col gap-8">
      {list?.map(item => (
        <NotificationItem
          key={item.id}
          item={item}
          onClick={() =>
            mapTypeToRoute(
              item.data.type,
              item.data.orgin ? item.data.orgin.id || '' : '',
              item.data.type === 'OFFER' ? item.data.refId : item.data.parentId,
              item.data.identity.type,
              item.data.identity.meta.username || item.data.identity.meta.shortname,
            )
          }
        />
      ))}
    </div>
  );
};
