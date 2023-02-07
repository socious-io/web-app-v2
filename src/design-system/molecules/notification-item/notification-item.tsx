import { logDOM } from '@testing-library/dom';
import { toRelativeTime } from '../../../core/relative-time';
import { Avatar } from '../../atoms/avatar/avatar';
import css from './notification-item.module.scss';
import { NotificationItemProps } from './notification-item.types';

export const NotificationItem = ({
  body,
  img,
  date,
  type,
  id,
  onClick,
}: NotificationItemProps): JSX.Element => {
  return (
    <div className={css.container} onClick={onClick}>
      {/* TODO: set proper type */}
      <Avatar size="3rem" type="users" img={img} />
      <div className={css.info}>
        <div className={css.infoText}>
          <span className={css.textName}>{body}</span>
        </div>
        <div className={css.date}>{toRelativeTime(date)}</div>
      </div>
    </div>
  );
};
