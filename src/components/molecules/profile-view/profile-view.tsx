import css from './profile-view.module.scss';
import { Avatar } from '../../atoms/avatar/avatar';
import { ProfileViewProps } from './profile-view.types';
import { useNavigate } from '@tanstack/react-location';

export const ProfileView = (props: ProfileViewProps): JSX.Element => {
  const { type, img, name, username, size, location, theme = 'light' } = props;
  const navigate = useNavigate();

  function navigateToProfile() {
    if (type === 'users') {
      navigate({ to: `/profile/users/${username}/view` });
    } else {
      navigate({ to: `/profile/organizations/${username}/view` });
    }
  }

  return (
    <div className={css.container}>
      <Avatar size={size} img={img} type={type} onClick={() => username && navigateToProfile()} />
      <div className={css.detail}>
        <div style={{ color: theme === 'dark' ? '#fff' : '' }} className={css.name}>
          {name}
        </div>
        <div style={{ color: theme === 'dark' ? '#fff' : '' }} className={css.location}>
          {location}
        </div>
      </div>
    </div>
  );
};
