import { NotificationListProps } from './notification-list.types';
import { NotificationItem } from '../../molecules/notification-item/notification-item';
import css from './notification-list.module.scss';
import { useNavigate } from '@tanstack/react-location';



export const NotificationList = ({ list, onMorePageClick }: NotificationListProps): JSX.Element => {
    const navigate = useNavigate();

    const navigateToPost = (id: string) => {
        navigate({ to: `../feeds/${id}` });
    }

    return (
        <div>
            {list.map((item, index) => <NotificationItem
                onClick={() => navigateToPost(item.data.parentId)}
                key={index}
                body={item.data.body.body}
                type={item.type}
                date={item.created_at}
                id={item.id}
                img={item.data.identity.meta.avatar} />)}
            <div className={css.seeMore} onClick={() => onMorePageClick()}>
                See more
            </div>
        </div>
    );
};