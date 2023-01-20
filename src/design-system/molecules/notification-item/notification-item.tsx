import { Avatar } from '../../atoms/avatar/avatar';
import css from './notification-item.module.scss';
import { NotificationItemProps } from './notification-item.types';

export const NotificationItem = ({ body, img, date }: NotificationItemProps): JSX.Element => {
    return (
        <div className={css.container}>
            <Avatar type='user' img={img}/>
            <div className={css.info}>
                <div className={css.infoText}>
                    <span className={css.textName}>{body}</span>
                </div>
                <div className={css.date}>{date}</div>
            </div>
        </div>
    );
};