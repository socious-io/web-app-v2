import { NotificationListProps, Notifications } from './notification-list.types';
import { NotificationItem } from '../../molecules/notification-item/notification-item';
import css from './notification-list.module.scss';
import { useNavigate } from '@tanstack/react-location';

export const NotificationList = ({ list, onMorePageClick, showSeeMore }: NotificationListProps): JSX.Element => {
  const navigate = useNavigate();

  const navigateToPost = (id: string) => {
    console.log('id: ', id);
    // navigate({ to: `../feeds/${id}` });
  };

  const avatarImage = (item: Notifications): string => item.data.identity.meta.avatar || item.data.identity.meta.image || '';

  return (
    <div>
      {list.map((item) => (
        <NotificationItem
          onClick={() => navigateToPost(item.data.parentId)}
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
