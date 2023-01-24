import { useMatch } from '@tanstack/react-location';
import { useState } from 'react';
import { isTouchDevice } from '../../../core/device-type-detector';
import { Desktop } from './desktop/desktop';
import { Mobile } from './mobile/mobile';
import { getNotificationList } from './notifications.service';
import { NotificationProps } from './notifications.types';

export const Notifications = (): JSX.Element => {
  const { data } = useMatch();

  const [notificationList, setNotificationList] = useState(data.items);
  const [page, setPage] = useState(1);

  function onMorePage() {
    getNotificationList({ page: page + 1 }).then((resp) => {
      setPage((v) => v + 1);
      setNotificationList((list) => [...list, ...resp.items]);
    });
  }

  return isTouchDevice() ? (
    <Mobile onMorePageClick={onMorePage} list={notificationList} />
  ) : (
    <Desktop />
  );
};
