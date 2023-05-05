import css from './profile-view.module.scss';
import { Avatar } from '../../atoms/avatar/avatar';
import { ProfileViewProps } from './profile-view.types';

export const ProfileView = (props: ProfileViewProps): JSX.Element => {
  const { type, img, name, size, location, theme = 'light' } = props;

  return (
    <div className={css.container}>
      <Avatar size={size} img={img} type={type} />
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
