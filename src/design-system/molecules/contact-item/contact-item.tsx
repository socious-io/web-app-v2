import { Badge } from '../../atoms/badge/badge';
import { ProfileView } from '../profile-view/profile-view';
import css from './contact-item.module.scss';
import { ContactItemProps } from './contact-item.types';

export const ContactItem = (props: ContactItemProps): JSX.Element => {
  return (
    <div className={css.container}>
      <ProfileView location={props.text} name={props.name} type="user" />
      <div className={css.right}>
        <div className={css.time}>{props.date2}</div>
        <Badge value={props.badge} />
      </div>
    </div>
  );
};
