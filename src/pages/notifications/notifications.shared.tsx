import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { notifications, NotificationsRes } from 'src/core/api';
import { IdentityReq } from 'src/core/types';
import { RootState } from 'src/store/store';

export const useNotificationsShared = () => {
  const list = useLoaderData() as NotificationsRes;
  const [notificationList, setNotificationList] = useState(list.items);
  const [page, setPage] = useState(1);
  const totalCount = list.total_count;
  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });
  const avatarImg = identity?.meta?.avatar || identity?.meta?.image;

  const onShowSeeMore = (length: number): boolean => {
    if (length < totalCount) {
      return true;
    }
    return false;
  };

  const onMorePageClick = () => {
    notifications({ page: page + 1 }).then((resp) => {
      setPage((v) => v + 1);
      setNotificationList((list) => [...list, ...resp.items]);
    });
  };

  return { notificationList, identity, avatarImg, onMorePageClick, onShowSeeMore };
};
