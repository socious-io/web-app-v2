import { ProfileView } from '../profile-view/profile-view';
import css from './contact-item.module.scss';
import { ContactItemProps } from './contact-item.types';

export const ContactItem = (props: ContactItemProps): JSX.Element => {
  return (
    <div className={css.container}>
      <ProfileView location={props.text} name={props.name} type="user" />
    </div>
  );
};
