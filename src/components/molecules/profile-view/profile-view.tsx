import css from './profile-view.module.scss';
import { Avatar } from '../../atoms/avatar/avatar';
import { ProfileViewProps } from './profile-view.types';
import { useNavigate } from '@tanstack/react-location';
import { CSSProperties } from 'react';

export const ProfileView = (props: ProfileViewProps): JSX.Element => {
  const { id, type, img, name, username, size = '3rem', location, theme = 'light' } = props;
  const navigate = useNavigate();

  function navigateToProfile() {
    if (type === 'users') {
      navigate({ to: `/profile/users/${username}/view` });
    } else {
      navigate({ to: `/profile/organizations/${username}/view` });
    }
  }

  function textStyles(): CSSProperties {
    if (props.width) {
      return {
        width: `calc(${props.width}px - ${size})`,
        textOverflow: 'ellipsis',
      };
    }
    return {};
  }
  function onApplicantClick() {
    if (id) {
      navigate({ to: `./${id}` });
    }
  }
  return (
    <div className={css.container} style={{ width: props.width }} onClick={onApplicantClick}>
      <Avatar size={size} img={img} type={type} onClick={() => username && navigateToProfile()} />
      <div className={css.detail}>
        <div style={{ color: theme === 'dark' ? '#fff' : '' }} className={css.name}>
          {name}
        </div>
        <div style={{ color: theme === 'dark' ? '#fff' : '' }}>
          <div className={css.location} style={textStyles()}>
            {location}
          </div>
        </div>
      </div>
    </div>
  );
};
