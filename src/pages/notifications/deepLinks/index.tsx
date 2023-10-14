import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CurrentIdentity, getNotification, Notification } from 'src/core/api';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import { RootState } from 'src/store';

export const DeepLinks = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });

  const status = useSelector((state: RootState) => state.identity.status);
  const { id } = useParams();

  async function getNotificationData() {
    const notification = await getNotification(id!);
    const path = getRedirectRoute(notification);
    navigate(`${path}`);
  }

  function getRedirectRoute(notification: Notification) {
    const username = notification.data.identity.meta.username || notification.data.identity.meta.shortname;
    const id = notification.data.type === 'OFFER' ? notification.data.refId : notification.data.parentId;
    const isOrg = currentIdentity && currentIdentity.type === 'organizations';
    const notifIdentity = notification.data.identity.type;

    switch (notification.type) {
      case 'FOLLOWED':
        return `/profile/${notifIdentity}/${username}/view`;
      case 'COMMENT_LIKE':
        return `/feeds/${id}`;
      case 'POST_LIKE':
        return `/feeds/${id}`;
      case 'COMMENT':
        return `/feeds/${id}`;
      case 'CHAT':
        return `/chats/contacts/${id}`;
      case 'SHARE_POST':
        return '';
      case 'SHARE_PROJECT':
        return '';
      case 'APPLICATION':
        return isOrg ? `/jobs/created/${id}/overview?tab=Applicants` : '';
      case 'OFFER':
        return isOrg ? '' : `/jobs/received-offer/${id}`;
      case 'REJECT':
        return isOrg ? '' : `/jobs/applied/${id}?tab=Applied`;
      case 'APPROVED':
        return isOrg ? `/jobs/created/${id}/overview?tab=Offered` : '';
      case 'HIRED':
        return isOrg ? '' : `/jobs/applied/${id}?tab=Hired`;
      case 'PROJECT_COMPLETE':
        return isOrg ? `/jobs/created/${id}/overview?tab=Hired` : '';
      case 'ASSIGNEE_CANCELED':
        return isOrg ? `/jobs/created/${id}/overview?tab=Offered` : '';
      case 'ASSIGNER_CANCELED':
        return isOrg ? '' : `/jobs/applied/${id}?tab=Applied`;
      case 'ASSIGNER_CONFIRMED':
        return isOrg ? '' : `/jobs/applied/${id}?tab=Hired`;
      case 'CONNECT':
        return `/profile/${notifIdentity}/${username}/view`;
      case 'ACCEPT_CONNECT':
        return `/profile/${notifIdentity}/${username}/view`;
      case 'MEMBERED':
        return '';
    }
  }

  useEffect(() => {
    if (status === 'failed') {
      const path = location.pathname;
      nonPermanentStorage.set({ key: 'savedLocation', value: path });
      navigate('/sign-in');
    } else if (status === 'succeeded') {
      getNotificationData();
    }
  }, [status]);

  return <div></div>;
};
