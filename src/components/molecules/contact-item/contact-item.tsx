import { Badge } from 'src/components/atoms/badge/badge';
import { ProfileView } from 'src/components/molecules/profile-view/profile-view';

import css from './contact-item.module.scss';
import { ContactItemProps } from './contact-item.types';

export const ContactItem = (props: ContactItemProps): JSX.Element => {
  const { onContactClick, ...rest } = props;
  return (
    <div className={css.container} onClick={() => onContactClick(rest)}>
      <ProfileView width={props.width} img={props.img} location={props.text} name={props.name} type={props.type} />
      <div className={css.right}>
        <div className={css.time}>{props.date2}</div>
        <div className={css.badge}>
          <Badge visibility={+props.badge ? 'visible' : 'hidden'} value={props.badge} />
        </div>
      </div>
    </div>
  );
};
