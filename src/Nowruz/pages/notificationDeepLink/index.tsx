import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Notification, getNotification as getNotificationApi, logout } from 'src/core/api';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import { removeIdentityList } from 'src/store/reducers/identity.reducer';

export const NotificationDeepLink = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notificationId } = useLoaderData() as { notificationId: string };
  const [notification, setNotification] = useState<Notification>();

  const getNotification = async () => {
    try {
      const res = await getNotificationApi(notificationId);
      setNotification(res);
    } catch (error) {
      if (error.response?.data.error === 'Not matched') {
        dispatch(removeIdentityList());
        await logout();
        navigate('/sign-in');
      } else if (error.response.data.error === 'Unauthorized') {
        const path = location.pathname;
        nonPermanentStorage.set({ key: 'savedLocation', value: path });
        navigate('/sign-in');
      }
    }
  };

  useEffect(() => {
    getNotification();
  }, []);

  useEffect(() => {
    if (notification) redirectToNotification();
  }, [notification]);

  const redirectToNotification = () => {
    if (!notification) return;
    const type = notification.data.identity.type;
    const username =
      type === 'users' ? notification.data.identity.meta.username : notification.data.identity.meta.shortname;
    const id = notification.data.type === 'OFFER' ? notification.data.refId : notification.data.parentId;
    const notifIdentity = notification.data.identity.type;
    const isOrg = type === 'organizations';
    let path = '';
    switch (notification.type) {
      case 'FOLLOWED':
        path = `/profile/${notifIdentity}/${username}/view`;
        break;
      case 'CHAT':
        path = `/chats?participantId=${notification.data.identity_id}`;
        break;
      case 'APPLICATION':
        path = isOrg ? `/jobs/created/${id}/overview?tab=Applicants` : '';
        break;
      case 'OFFER':
      case 'REJECT':
      case 'APPROVED':
      case 'HIRED':
      case 'PROJECT_COMPLETE':
      case 'ASSIGNEE_CANCELED':
      case 'ASSIGNER_CANCELED':
      case 'ASSIGNER_CONFIRMED':
        path = '/contracts';
        break;
      case 'CONNECT':
        path = `/profile/${notifIdentity}/${username}/view`;
        break;
      case 'ACCEPT_CONNECT':
        path = `/profile/${notifIdentity}/${username}/view`;
        break;
      case 'MEMBERED':
      case 'COMMENT_LIKE':
      case 'POST_LIKE':
      case 'COMMENT':
      case 'SHARE_POST':
      case 'SHARE_PROJECT':
        path = '/';
        break;
    }
    navigate(path);
  };

  return <div />;
};
