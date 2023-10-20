import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { CurrentIdentity, identities, notifications, NotificationsRes, OrgMeta, UserMeta } from 'src/core/api';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import { RootState } from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';

export const useNotificationsShared = () => {
  const list = useLoaderData() as NotificationsRes;
  const dispatch = useDispatch();
  const [notificationList, setNotificationList] = useState(list.items);
  const [page, setPage] = useState(1);
  const totalCount = list.total_count;
  const identity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const avatarImg = identity ? (identity.meta as UserMeta).avatar || (identity.meta as OrgMeta).image : '';

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

  const switchAccount = async (id: string) => {
    await nonPermanentStorage.set({ key: 'identity', value: id });
    identities().then((resp) => dispatch(setIdentityList(resp)));
  };

  return { notificationList, identity, avatarImg, onMorePageClick, onShowSeeMore, switchAccount };
};
