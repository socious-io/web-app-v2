import { useNavigate } from '@tanstack/react-location';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { NotificationListProps, Notifications } from './notification-list.types';
import { NotificationItem } from '../../molecules/notification-item/notification-item';
import { dialog } from 'src/core/dialog/dialog';
import { IdentityReq } from 'src/core/types';
import css from './notification-list.module.scss';

export const NotificationList = ({ list, onMorePageClick, showSeeMore, route }: NotificationListProps): JSX.Element => {
  const navigate = useNavigate();
  const currentIdentity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });
  const isOrg = currentIdentity.type === 'organizations';

  const mapTypeToRoute = (id: string, notifIdentity: string, username?: string): Record<string, string> => {
    return {
      FOLLOWED: `/profile/${notifIdentity}/${username}/view`,
      COMMENT_LIKE: `/feeds/${id}`,
      POST_LIKE: `/feeds/${id}`,
      CHAT: `/chats/contacts/${id}`,
      SHARE_POST: '',
      SHARE_PROJECT: '',
      COMMENT: `/feeds/${id}`,
      APPLICATION: isOrg ? `/${route}/jobs/created/${id}/overview` : '',
      OFFER: isOrg ? '' : `/jobs/received-offer/${id}/${route}`,
      REJECT: isOrg ? '' : `/${route}/jobs/applied/${id}`,
      APPROVED: isOrg ? `/${route}/jobs/created/${id}/overview` : '',
      HIRED: isOrg ? '' : `/${route}/jobs/applied/${id}`,
      PROJECT_COMPLETE: isOrg ? `/${route}/jobs/created/${id}/overview` : '',
      ASSIGNEE_CANCELED: isOrg ? `/${route}/jobs/created/${id}/overview` : '',
      ASSIGNER_CANCELED: isOrg ? '' : `/${route}/jobs/applied/${id}`,
      ASSIGNER_CONFIRMED: isOrg ? '' : `/${route}/jobs/applied/${id}`,
      CONNECT: `/profile/${notifIdentity}/${username}/view`,
      ACCEPT_CONNECT: `/profile/${notifIdentity}/${username}/view`,
      MEMBERED: '', // FIXME: later for memeber feature
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
              item.data.identity.meta.username || item.data.identity.meta.shortname
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
