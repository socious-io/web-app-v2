import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ConnectStatus, CurrentIdentity, block, follow, removeConnection, unfollow } from 'src/core/api';
import { getIdentityMeta } from 'src/core/utils';
import { RootState } from 'src/store';
import { setConnectionStatus } from 'src/store/reducers/profile.reducer';

import { MenuItemType } from './threeDotsButton.types';

export const useThreeDotsButton = (otherIdentityId: string) => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );

  const connectionStatus = useSelector<RootState, ConnectStatus | undefined | null>(
    state => state.profile.identity?.connection_status,
  );
  const following = useSelector<RootState, boolean | undefined>(state => state.profile.identity?.following);
  const follower = useSelector<RootState, boolean | undefined>(state => state.profile.identity?.follower);
  const connectionId = useSelector<RootState, string | undefined>(state => state.profile.identity?.connection_id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [openMenu, setOpenMenu] = useState(false);
  const getConectionStatus = () => {
    const items: MenuItemType[] = [];

    if (following) items.push({ iconName: 'x-circle', title: 'Unfollow', onClick: handleUnfollow });
    if (connectionStatus === 'CONNECTED' && !following)
      items.push({ iconName: 'plus-circle', title: 'Follow', onClick: handleFollow });
    if (connectionStatus === 'CONNECTED')
      items.push({ iconName: 'user-x-01', title: 'Remove connection', onClick: handleRemoveConnection });

    // items.push({ iconName: 'share-01', title: 'Share profile' });
    setMenuItems(items);
  };

  useEffect(() => {
    getConectionStatus();
  }, [follower, following]);

  const handleClose = () => {
    setOpenMenu(false);
  };

  const navigateToProfile = () => {
    const { username, type } = getIdentityMeta(currentIdentity);
    const modifiedUsername = username.replace('@', '');
    if (type === 'users') navigate(`/profile/users/${modifiedUsername}/view`);
    else navigate(`/profile/organizations/${modifiedUsername}/view`);
  };

  const handleBlock = async () => {
    try {
      const res = await block(otherIdentityId);
      if (res.status === 'BLOCKED') {
        navigateToProfile();
      }
    } catch {
      handleClose();
    }
  };

  const handleUnfollow = async () => {
    try {
      const res = await unfollow(otherIdentityId);

      if (res.message === 'success') {
        const payload = {
          connection_id: connectionId,
          connection_status: connectionStatus,
          follower: follower,
          following: false,
        };
        await dispatch(setConnectionStatus(payload));
      }
      handleClose();
    } catch {
      handleClose();
    }
  };

  const handleFollow = async () => {
    try {
      const res = await follow(otherIdentityId);
      if (res?.id) {
        const payload = {
          connection_id: connectionId,
          connection_status: connectionStatus,
          follower: follower,
          following: true,
        };
        await dispatch(setConnectionStatus(payload));
      }
      handleClose();
    } catch {
      handleClose();
    }
  };

  const handleRemoveConnection = async () => {
    try {
      if (!connectionId) return;
      const res = await removeConnection(connectionId);
      if (res.message === 'success') {
        const payload = {
          connection_id: '',
          connection_status: null,
          follower: false,
          following: false,
        };
        await dispatch(setConnectionStatus(payload));
      }
      handleClose();
    } catch {
      handleClose();
    }
  };

  return { openMenu, setOpenMenu, handleClose, menuItems, handleBlock, connectionStatus };
};
