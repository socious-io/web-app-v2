import { toRelativeTime } from '../../../core/relative-time';
import { Avatar } from '../../atoms/avatar/avatar';
import css from './notification-item.module.scss';
import { NotificationItemProps } from './notification-item.types';

export const NotificationItem = ({
  body,
  img,
  date,
  type,
  onClick,
}: NotificationItemProps): JSX.Element => {
  return (
    <div className={css.container} onClick={onClick}>
      <Avatar size="3rem" type={type} img={img} />
      <div className={css.info}>
        <div className={css.infoText}>
          <span className={css.textName}>{body}</span>
        </div>
        <div className={css.date}>{toRelativeTime(date)}</div>
      </div>
    </div>
  );
};
