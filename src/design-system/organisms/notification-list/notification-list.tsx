import { NotificationListProps } from './Notification-list.types';
import { NotificationItem } from '../../molecules/notification-item/notification-item';



export const NotificationList = ({list}: NotificationListProps): JSX.Element => {
    return (
        <div>
            {list.map((item, index) => <NotificationItem key={index} body={item.body} date={item.date} img={item.img} />)}
        </div>
    );
};