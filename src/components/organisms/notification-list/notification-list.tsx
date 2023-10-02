import { useSelector } from 'react-redux';
import { dialog } from 'src/core/dialog/dialog';
import { IdentityReq } from 'src/core/types';
import { RootState } from 'src/store';

import css from './notification-list.module.scss';
import { NotificationListProps, Notifications } from './notification-list.types';
import { NotificationItem } from '../../molecules/notification-item/notification-item';

export const NotificationList = ({ list, onMorePageClick, showSeeMore, route }: NotificationListProps): JSX.Element => {
  const navigate = {};
  const currentIdentity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });
  const isOrg = currentIdentity.type === 'organizations';

  const mapTypeToRoute = (id: string, notifIdentity: string, username?: string): Record<string, string> => {
    return {
      FOLLOWED: `/profile/${notifIdentity}/${username}/view`,
      COMMENT_LIKE: `/feeds/${id}`,
      POST_LIKE: `/feeds/${id}`,
      CHAT: `/${route}/chats/contacts/${id}`,
      SHARE_POST: '',
      SHARE_PROJECT: '',
      COMMENT: `/feeds/${id}`,
      APPLICATION: isOrg ? `/${route}/jobs/created/${id}/overview?tab=Applicants` : '',
      OFFER: isOrg ? '' : `/jobs/received-offer/${id}/${route}`,
      REJECT: isOrg ? '' : `/${route}/jobs/applied/${id}?tab=Applied`,
      APPROVED: isOrg ? `/${route}/jobs/created/${id}/overview?tab=Offered` : '',
      HIRED: isOrg ? '' : `/${route}/jobs/applied/${id}?tab=Hired`,
      PROJECT_COMPLETE: isOrg ? `/${route}/jobs/created/${id}/overview?tab=Hired` : '',
      ASSIGNEE_CANCELED: isOrg ? `/${route}/jobs/created/${id}/overview?tab=Offered` : '',
      ASSIGNER_CANCELED: isOrg ? '' : `/${route}/jobs/applied/${id}?tab=Applied`,
      ASSIGNER_CONFIRMED: isOrg ? '' : `/${route}/jobs/applied/${id}?tab=Hired`,
      CONNECT: `/profile/${notifIdentity}/${username}/view`,
      ACCEPT_CONNECT: `/profile/${notifIdentity}/${username}/view`,
      MEMBERED: '', // FIXME: later for member feature
    };
  };

  const navigateToPost = (id: string, type: string, identity: string, username?: string) => {
    const to = mapTypeToRoute(id, identity, username)[type];
    to
      ? navigate({ to })
      : dialog.alert({
          message: `Please, switch your identity to ${isOrg ? 'user' : 'organization'} first`,
        });
  };

  const avatarImage = (item: Notifications): string =>
    item.data.identity.meta.avatar || item.data.identity.meta.image || '';

  return (
    <div>
      {list.map((item) => (
        <NotificationItem
          onClick={() =>
            navigateToPost(
              item.data.type === 'OFFER' ? item.data.refId : item.data.parentId,
              item.data.type,
              item.data.identity.type,
              item.data.identity.meta.username || item.data.identity.meta.shortname,
            )
          }
          key={item.id}
          body={item.data.body.body}
          type={item.data.identity.type}
          date={item.created_at}
          img={avatarImage(item)}
        />
      ))}

      {showSeeMore && (
        <div className={css.seeMore} onClick={() => onMorePageClick()}>
          See more
        </div>
      )}
    </div>
  );
};
